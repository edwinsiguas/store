package com.zeciakstore.backend.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class OrderSerializationTest {

    @Test
    void serializesOrderItemsWithoutRecursionOrUserCredentials() throws Exception {
        Product product = new Product(
                1L, "Bikini", "Bikini de playa", new BigDecimal("50.00"), 10, "image.png"
        );
        Order order = new Order();
        order.setId(1L);
        order.setUser(new User(1L, "test@test.com", "secret", "Test User", Role.ROLE_CLIENT));
        order.setTotalAmount(new BigDecimal("50.00"));
        order.setStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());

        OrderItem item = new OrderItem();
        item.setId(1L);
        item.setOrder(order);
        item.setProduct(product);
        item.setQuantity(1);
        item.setSubtotal(new BigDecimal("50.00"));
        order.setItems(List.of(item));

        JsonNode json = new ObjectMapper().findAndRegisterModules().valueToTree(order);

        assertEquals(1L, json.get("id").asLong());
        assertEquals("Bikini", json.get("items").get(0).get("product").get("name").asText());
        assertFalse(json.has("user"));
        assertFalse(json.get("items").get(0).has("order"));
        assertFalse(json.toString().contains("secret"));
    }
}
