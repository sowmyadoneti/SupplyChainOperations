package com.example.crmapp.service;

import com.example.crmapp.model.Role;
import com.example.crmapp.model.User;
import com.example.crmapp.repository.UserRepository;
import com.example.crmapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Ensure password encoding

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    public String register(String username, String password, Role role) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password)); // Encode password before saving
        user.setRoles(new HashSet<>(Collections.singletonList(role)));
        userRepository.save(user);
        return "User registered successfully";
    }

    public String login(String username, String password) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // 🔍 Verify password match
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        // ✅ Fetch user roles
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> roles = user.getRoles().stream()
                .map(Enum::name)
                .collect(Collectors.toList());

        // ✅ Generate token with username & roles
        return jwtUtil.generateToken(username, roles);
    }
}
