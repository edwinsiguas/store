package com.zeciakstore.backend.controller;

import com.zeciakstore.backend.dto.AuthRequestDTO;
import com.zeciakstore.backend.dto.AuthResponseDTO;
import com.zeciakstore.backend.dto.RegisterRequestDTO;
import com.zeciakstore.backend.model.Role;
import com.zeciakstore.backend.model.User;
import com.zeciakstore.backend.repository.UserRepository;
import com.zeciakstore.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") // ¡PERMITE QUE ANGULAR SE CONECTE AUTOMÁTICAMENTE!
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequestDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();

        return ResponseEntity.ok(new AuthResponseDTO(jwt, user.getEmail(), user.getRole().name()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequestDTO registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return new ResponseEntity<>("Email ya está en uso!", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        
        if (registerRequest.getRole() != null && registerRequest.getRole().equalsIgnoreCase("ADMIN")) {
            user.setRole(Role.ROLE_ADMIN);
        } else {
            user.setRole(Role.ROLE_CLIENT);
        }

        userRepository.save(user); // Guarda automáticamente en la base de datos

        return new ResponseEntity<>("Usuario registrado exitosamente", HttpStatus.CREATED);
    }
}
