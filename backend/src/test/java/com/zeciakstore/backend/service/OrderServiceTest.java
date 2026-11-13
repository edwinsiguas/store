package com.zeciakstore.backend.service;

import com.zeciakstore.backend.dto.OrderItemRequestDTO;
import com.zeciakstore.backend.dto.OrderRequestDTO;
import com.zeciakstore.backend.model.Order;
import com.zeciakstore.backend.model.Product;
import com.zeciakstore.backend.model.Role;
import com.zeciakstore.backend.model.User;
import com.zeciakstore.backend.repository.OrderRepository;
import com.zeciakstore.backend.repository.ProductRepository;
import com.zeciakstore.backend.repository.UserRepository;
import com.zeciakstore.backend.service.impl.OrderServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    private User user;
    private Product product;

    @BeforeEach
    void setUp() {
        user = new User(1L, "test@test.com", "password", "Test User", Role.ROLE_CLIENT);
        product = new Product(1L, "Bikini", "Bikini de playa", new BigDecimal("50.00"), 10, "url");
    }

    @Test
    void testCreateOrder_Success() {
        // Arrange
        OrderRequestDTO requestDTO = new OrderRequestDTO();
        OrderItemRequestDTO itemDTO = new OrderItemRequestDTO();
        itemDTO.setProductId(1L);
        itemDTO.setQuantity(2); // Valid quantity (10 in stock)
        requestDTO.setItems(Collections.singletonList(itemDTO));

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Order createdOrder = orderService.createOrder(1L, requestDTO);

        // Assert
        assertNotNull(createdOrder);
        assertEquals("PENDING", createdOrder.getStatus());
        assertEquals(new BigDecimal("100.00"), createdOrder.getTotalAmount()); // 2 * 50.00
        
        // Verificamos que el stock se haya reducido
        assertEquals(8, product.getStock()); 
        verify(productRepository, times(1)).save(product);
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    void testCreateOrder_NotEnoughStock() {
        // Arrange
        OrderRequestDTO requestDTO = new OrderRequestDTO();
        OrderItemRequestDTO itemDTO = new OrderItemRequestDTO();
        itemDTO.setProductId(1L);
        itemDTO.setQuantity(15); // Exceeds stock of 10
        requestDTO.setItems(Collections.singletonList(itemDTO));

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            orderService.createOrder(1L, requestDTO);
        });

        assertEquals("Not enough stock for product: Bikini", exception.getMessage());
        
        // Verificamos que no se intentó guardar la orden
        verify(orderRepository, never()).save(any(Order.class));
    }
}
