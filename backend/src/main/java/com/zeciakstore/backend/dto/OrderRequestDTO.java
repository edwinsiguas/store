package com.zeciakstore.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequestDTO {
    private List<OrderItemRequestDTO> items;
}
