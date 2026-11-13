package com.zeciakstore.backend.controller;

import com.zeciakstore.backend.dto.OrderRequestDTO;
import com.zeciakstore.backend.model.Order;
import com.zeciakstore.backend.security.UserPrincipal;
import com.zeciakstore.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    @PreAuthorize("hasRole('CLIENT') or hasRole('ADMIN')")
    public ResponseEntity<Order> createOrder(@AuthenticationPrincipal UserPrincipal currentUser,
                                             @RequestBody OrderRequestDTO orderRequest) {
        Order order = orderService.createOrder(currentUser.getId(), orderRequest);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/my-orders")
    @PreAuthorize("hasRole('CLIENT') or hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getMyOrders(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(orderService.getOrdersByUser(currentUser.getId()));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
