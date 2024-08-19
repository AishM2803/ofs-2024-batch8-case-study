package com.ofss.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ofss.main.domain.AccountDetail;
import com.ofss.main.domain.CustomerDetail;
import com.ofss.main.domain.LoginDetail;
import com.ofss.main.service.AccountService;
import com.ofss.main.service.CustomerService;
import com.ofss.main.service.LoginService;
import com.ofss.main.service.TransactionService;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody CustomerDetail customerDetail) {
        CustomerDetail savedCustomer = customerService.registerCustomer(customerDetail);

        LoginDetail loginDetail = new LoginDetail();
        loginDetail.setCustomerId(savedCustomer.getCustomerId());
        loginDetail.setUsername(customerDetail.getUsername());
        loginDetail.setPassword(customerDetail.getPassword()); 
        loginService.saveLoginDetail(loginDetail);

        return ResponseEntity.status(HttpStatus.CREATED).body("Customer registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        boolean loginSuccess = loginService.attemptLogin(username, password);
        if (loginSuccess) {
            return ResponseEntity.ok("Login successful.");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
    }

    @PostMapping("/update-account")
    public ResponseEntity<String> updateAccountDetails(
            @RequestParam Long customerId, 
            @RequestParam String accountType, 
            @RequestParam Double balance) {
        
        AccountDetail updatedAccount = accountService.updateAccountDetails(customerId, accountType, balance);
        return ResponseEntity.ok("Account details updated successfully.");
    }

    @PostMapping("/transaction")
    public ResponseEntity<String> performTransaction(
            @RequestParam Integer accountId, 
            @RequestParam String transactionType, 
            @RequestParam Double amount) {
        
        String result = transactionService.performTransaction(accountId, transactionType, amount);
        if ("Deposit successful.".equals(result) || "Withdrawal successful.".equals(result)) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
    }
}
