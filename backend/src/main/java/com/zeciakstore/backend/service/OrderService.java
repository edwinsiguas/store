package com.zeciakstore.backend.service;

import com.zeciakstore.backend.dto.OrderRequestDTO;
import com.zeciakstore.backend.model.Order;

import java.util.List;

public interface OrderService {
    Order createOrder(Long userId, OrderRequestDTO orderRequest);
    List<Order> getOrdersByUser(Long userId);
    List<Order> getAllOrders();
    Order updateOrderStatus(Long orderId, String status);
}
