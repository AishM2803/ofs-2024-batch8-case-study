package com.ofss.main.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ofss.main.domain.CustomerDetail;
import com.ofss.main.domain.LoginDetail;
import com.ofss.main.service.CustomerService;
import com.ofss.main.service.LoginService;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private LoginService loginService;

    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody CustomerDetail customerDetail) {
        CustomerDetail savedCustomer = customerService.registerCustomer(customerDetail);
        
        LoginDetail loginDetail = new LoginDetail();
        loginDetail.setCustomerId(savedCustomer.getCustomerId());
        loginDetail.setUsername(customerDetail.getUsername());
        loginDetail.setPassword(customerDetail.getPassword()); // Ensure password is hashed in real applications
        loginService.saveLoginDetail(loginDetail);
        
        return ResponseEntity.status(HttpStatus.CREATED).body("Customer registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        LoginDetail loginDetail = loginService.getLoginDetailByUsername(username);
        if (loginDetail != null && loginDetail.getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful.");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
    }
}
