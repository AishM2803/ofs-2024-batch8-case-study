package com.ofss.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ofss.main.domain.Customer;
import com.ofss.main.service.CustomerService;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:8080")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public String registerCustomer(@RequestBody Customer customer) {
        customerService.addNewCustomer(customer);
        return "Registration successful";
    }
}
