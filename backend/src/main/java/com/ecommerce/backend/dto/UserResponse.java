package com.ecommerce.backend.dto;

public class UserResponse {
    private String fullName;
    private String email;
    private String role;
    private String token;

    public UserResponse() {}

    public UserResponse(String fullName, String email, String role, String token) {
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
