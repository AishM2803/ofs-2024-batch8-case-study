package com.ofss.main.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ofss.main.domain.LoginDetail;
import com.ofss.main.repository.LoginDetailRepository;

@Service
public class LoginService {

    @Autowired
    private LoginDetailRepository loginDetailRepository;

    public LoginDetail saveLoginDetail(LoginDetail loginDetail) {
        return loginDetailRepository.save(loginDetail);
    }

    public LoginDetail getLoginDetailByUsername(String username) {
        return loginDetailRepository.findByUsername(username);
    }
}
