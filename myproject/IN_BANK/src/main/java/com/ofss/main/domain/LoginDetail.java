package com.ofss.main.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "logins_detail")
public class LoginDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "customer_id")
    private Long customerId;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "attempts")
    private Integer attempts = 0;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAttempts() {
        return attempts;
    }

    public void setAttempts(Integer attempts) {
        this.attempts = attempts;
    }

    @Override
    public String toString() {
        return "LoginDetail{" +
                "id=" + id +
                ", customerId=" + customerId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", attempts=" + attempts +
                '}';
    }
}
