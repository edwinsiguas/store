package com.zeciakstore.backend.service.impl;

import com.zeciakstore.backend.dto.OrderItemRequestDTO;
import com.zeciakstore.backend.dto.OrderItemResponseDTO;
import com.zeciakstore.backend.dto.OrderRequestDTO;
import com.zeciakstore.backend.dto.OrderResponseDTO;
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
import java.util.stream.Collectors;

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
    public OrderResponseDTO createOrder(Long userId, OrderRequestDTO orderRequest) {
        if (orderRequest.getItems() == null || orderRequest.getItems().isEmpty()) {
            throw new IllegalArgumentException("La orden debe contener al menos un producto");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");

        List<OrderItem> items = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequestDTO itemDto : orderRequest.getItems()) {
            if (itemDto.getProductId() == null) {
                throw new IllegalArgumentException("El ID de producto es obligatorio");
            }
            if (itemDto.getQuantity() == null || itemDto.getQuantity() < 1) {
                throw new IllegalArgumentException("La cantidad debe ser al menos 1");
            }

            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + itemDto.getProductId()));

            if (product.getStock() < itemDto.getQuantity()) {
                throw new RuntimeException("Stock insuficiente para el producto: " + product.getName()
                        + " (Disponible: " + product.getStock() + ", Solicitado: " + itemDto.getQuantity() + ")");
            }

            // Descontar stock
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

        Order savedOrder = orderRepository.save(order);
        return mapToDTO(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderResponseDTO updateOrderStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada con ID: " + orderId));
        order.setStatus(status);
        Order updated = orderRepository.save(order);
        return mapToDTO(updated);
    }

    private OrderResponseDTO mapToDTO(Order order) {
        List<OrderItemResponseDTO> itemDTOs = new ArrayList<>();
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                Product p = item.getProduct();
                itemDTOs.add(OrderItemResponseDTO.builder()
                        .id(item.getId())
                        .productId(p != null ? p.getId() : null)
                        .name(p != null ? p.getName() : "Producto")
                        .quantity(item.getQuantity())
                        .price(p != null ? p.getPrice() : item.getSubtotal())
                        .imageUrl(p != null ? p.getImageUrl() : "")
                        .build());
            }
        }

        return OrderResponseDTO.builder()
                .id(order.getId())
                .total(order.getTotalAmount())
                .status(order.getStatus())
                .createdAt(order.getOrderDate())
                .items(itemDTOs)
                .build();
    }
}
