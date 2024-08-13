package com.ofss.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ofss.main.domain.Login;
import com.ofss.main.service.LoginService;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:8080")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/authenticate")
    public String authenticateLogin(@RequestBody Login login) {
        Login existingLogin = loginService.getLoginByUsername(login.getUsername());

        if (existingLogin == null) {
            return "Username not found";
        }

        if (!existingLogin.getPassword().equals(login.getPassword())) {
            return "Incorrect password";
        }

        return "Login successful";
    }
}
