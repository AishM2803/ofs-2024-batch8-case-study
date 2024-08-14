package com.ofss.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ofss.main.domain.AccountDetail;
import com.ofss.main.domain.TransactionDetail;
import com.ofss.main.repository.AccountDetailRepository;
import com.ofss.main.repository.TransactionDetailRepository;

import jakarta.transaction.Transactional;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountDetailRepository accountDetailRepository;

    @Autowired
    private TransactionDetailRepository transactionDetailRepository;

    // Method to create or update an account
    public AccountDetail updateAccountDetails(Long customerId, String accountType, Double balance) {
        // Check if the account already exists
        Optional<AccountDetail> existingAccount = accountDetailRepository.findByCustomerId(customerId);

        AccountDetail accountDetail;

        if (existingAccount.isPresent()) {
            // Update existing account
            accountDetail = existingAccount.get();
            accountDetail.setAccountType(accountType);
            if ("Savings".equalsIgnoreCase(accountType)) {
                accountDetail.setMinBalance(1000.00);
                accountDetail.setOverdraftAvailable(false);
            } else if ("Current".equalsIgnoreCase(accountType)) {
                accountDetail.setMinBalance(0.00);
                accountDetail.setOverdraftAvailable(true);
            }
            // Update balance if needed
            accountDetail.setBalance(balance);
        } else {
            // Create new account
            accountDetail = new AccountDetail();
            accountDetail.setCustomerId(customerId);
            accountDetail.setAccountType(accountType);
            if ("Savings".equalsIgnoreCase(accountType)) {
                accountDetail.setMinBalance(1000.00);
                accountDetail.setOverdraftAvailable(false);
            } else if ("Current".equalsIgnoreCase(accountType)) {
                accountDetail.setMinBalance(0.00);
                accountDetail.setOverdraftAvailable(true);
            }
            // Set initial balance
            accountDetail.setBalance(balance);
        }

        return accountDetailRepository.save(accountDetail);
    }

    // Method to perform a transaction (deposit or withdraw)
    @Transactional
    public String performTransaction(Integer accountId, String transactionType, Double amount) {
        Optional<AccountDetail> optionalAccount = accountDetailRepository.findById(accountId);

        if (optionalAccount.isEmpty()) {
            return "Account not found.";
        }

        AccountDetail account = optionalAccount.get();
        Double currentBalance = account.getBalance();
        Double minBalance = account.getMinBalance();
        Boolean overdraftAvailable = account.getOverdraftAvailable();

        if ("Deposit".equalsIgnoreCase(transactionType)) {
            account.setBalance(currentBalance + amount);
            accountDetailRepository.save(account);
            saveTransaction(accountId, transactionType, amount);
            return "Deposit successful.";
        } else if ("Withdraw".equalsIgnoreCase(transactionType)) {
            if (currentBalance - amount < minBalance && !overdraftAvailable) {
                return "Insufficient funds.";
            }
            account.setBalance(currentBalance - amount);
            accountDetailRepository.save(account);
            saveTransaction(accountId, transactionType, amount);
            return "Withdrawal successful.";
        } else {
            return "Invalid transaction type.";
        }
    }

    // Method to save a transaction record
    private void saveTransaction(Integer accountId, String transactionType, Double amount) {
        TransactionDetail transactionDetail = new TransactionDetail();
        transactionDetail.setAccountId(accountId);
        transactionDetail.setTransactionType(transactionType);
        transactionDetail.setAmount(amount);
        transactionDetailRepository.save(transactionDetail);
    }
}
