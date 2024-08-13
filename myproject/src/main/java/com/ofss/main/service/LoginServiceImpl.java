package com.ofss.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ofss.main.domain.Login;
import com.ofss.main.repository.LoginRepository;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private LoginRepository loginRepository;

    @Override
    public Login addNewLogin(Login login) {
        return loginRepository.save(login);
    }

    @Override
    public Login getLoginByUsername(String username) {
        return loginRepository.findByUsername(username);
    }
}
