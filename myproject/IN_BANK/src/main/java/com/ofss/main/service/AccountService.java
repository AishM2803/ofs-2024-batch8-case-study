package com.ofss.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ofss.main.domain.AccountDetail;
import com.ofss.main.repository.AccountDetailRepository;

@Service
public class AccountService {

    @Autowired
    private AccountDetailRepository accountDetailRepository;

    public AccountDetail updateAccountDetails(Long customerId, String accountType) {
        AccountDetail accountDetail = new AccountDetail();
        accountDetail.setCustomerId(customerId);
        accountDetail.setAccountType(accountType);
        
        if ("Savings".equalsIgnoreCase(accountType)) {
            accountDetail.setMinBalance(1000.00);
            accountDetail.setOverdraftAvailable(false);
        } else if ("Current".equalsIgnoreCase(accountType)) {
            accountDetail.setMinBalance(0.00);
            accountDetail.setOverdraftAvailable(true);
        }
        
        return accountDetailRepository.save(accountDetail);
    }
}
