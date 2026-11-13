package com.zeciakstore.backend.service.impl;

import com.zeciakstore.backend.dto.OrderItemRequestDTO;
import com.zeciakstore.backend.dto.OrderRequestDTO;
import com.zeciakstore.backend.model.Order;
import com.zeciakstore.backend.model.OrderItem;
import com.zeciakstore.backend.model.Product;
import com.zeciakstore.backend.model.User;
import com.zeciakstore.backend.repository.OrderRepository;
import com.zeciakstore.backend.repository.ProductRepository;
import com.zeciakstore.backend.repository.UserRepository;
import com.zeciakstore.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional
    public Order createOrder(Long userId, OrderRequestDTO orderRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        
        List<OrderItem> items = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequestDTO itemDto : orderRequest.getItems()) {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < itemDto.getQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }

            // Reduce stock
            product.setStock(product.getStock() - itemDto.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDto.getQuantity());
            
            BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity()));
            orderItem.setSubtotal(subtotal);
            
            items.add(orderItem);
            totalAmount = totalAmount.add(subtotal);
        }

        order.setItems(items);
        order.setTotalAmount(totalAmount);

        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
