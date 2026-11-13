package com.zeciakstore.backend.service;

import com.zeciakstore.backend.dto.OrderRequestDTO;
import com.zeciakstore.backend.dto.OrderResponseDTO;

import java.util.List;

public interface OrderService {
    OrderResponseDTO createOrder(Long userId, OrderRequestDTO orderRequest);
    List<OrderResponseDTO> getOrdersByUser(Long userId);
    List<OrderResponseDTO> getAllOrders();
    OrderResponseDTO updateOrderStatus(Long orderId, String status);
}
