package com.ofss.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ofss.main.domain.CustomerDetail;
import com.ofss.main.domain.LoginDetail;
import com.ofss.main.repository.LoginDetailRepository;

@Service
public class LoginService {

    @Autowired
    private LoginDetailRepository loginDetailRepository;

    @Autowired
    private CustomerService customerService;

    private static final int MAX_ATTEMPTS = 3;

    public LoginDetail saveLoginDetail(LoginDetail loginDetail) {
        return loginDetailRepository.save(loginDetail);
    }

    public LoginDetail getLoginDetailByUsername(String username) {
        return loginDetailRepository.findByUsername(username);
    }

    public boolean attemptLogin(String username, String password) {
        LoginDetail loginDetail = loginDetailRepository.findByUsername(username);
        if (loginDetail == null) {
            return false;
        }

        if (loginDetail.getAttempts() >= MAX_ATTEMPTS) {
            CustomerDetail customer = customerService.getCustomerByUsername(username);
            if (customer != null) {
                customer.setLockedStatus(true);
                customerService.registerCustomer(customer); // Save locked status
            }
            return false;
        }

        if (loginDetail.getPassword().equals(password)) {
            loginDetail.setAttempts(0); // Reset attempts on successful login
            loginDetailRepository.save(loginDetail);
            return true;
        } else {
            loginDetail.setAttempts(loginDetail.getAttempts() + 1); // Increment attempts
            loginDetailRepository.save(loginDetail);
            return false;
        }
    }
}
