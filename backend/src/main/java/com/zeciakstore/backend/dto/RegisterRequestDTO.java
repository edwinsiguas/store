package com.zeciakstore.backend.dto;

import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String name;
    private String email;
    private String password;
    // Assuming default role is CLIENT, or can be passed to register admins
    private String role;
}
