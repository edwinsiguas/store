package com.zeciakstore.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer";
    private String email;
    private String role;

    public AuthResponseDTO(String accessToken, String email, String role) {
        this.accessToken = accessToken;
        this.email = email;
        this.role = role;
    }
}
