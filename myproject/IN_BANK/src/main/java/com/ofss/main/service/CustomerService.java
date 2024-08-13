package com.ofss.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ofss.main.domain.CustomerDetail;
import com.ofss.main.repository.CustomerDetailRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerDetailRepository customerDetailRepository;

    public CustomerDetail registerCustomer(CustomerDetail customerDetail) {
        return customerDetailRepository.save(customerDetail);
    }

    public CustomerDetail getCustomerByUsername(String username) {
        return customerDetailRepository.findByUsername(username);
    }
}
