package com.ofss.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ofss.main.domain.AccountDetail;
import com.ofss.main.domain.BankSlip;
import com.ofss.main.domain.TransactionDetail;
import com.ofss.main.repository.AccountDetailRepository;
import com.ofss.main.repository.BankSlipRepository;
import com.ofss.main.repository.TransactionDetailRepository;

@Service
public class TransactionService {

    @Autowired
    private AccountDetailRepository accountDetailRepository;

    @Autowired
    private TransactionDetailRepository transactionDetailRepository;

    @Autowired
    private BankSlipRepository bankSlipRepository;

    public String performTransaction(Integer accountId, String transactionType, Double amount) {
        AccountDetail account = accountDetailRepository.findById(accountId).orElse(null);

        if (account == null) {
            return "Account not found.";
        }

        if ("Withdraw".equalsIgnoreCase(transactionType)) {
            if (account.getBalance() < amount) {
                return "Insufficient funds.";
            }
            account.setBalance(account.getBalance() - amount);
        } else if ("Deposit".equalsIgnoreCase(transactionType)) {
            account.setBalance(account.getBalance() + amount);
        } else {
            return "Invalid transaction type.";
        }

        accountDetailRepository.save(account);

        TransactionDetail transaction = new TransactionDetail();
        transaction.setTransactionType(transactionType);
        transaction.setAmount(amount);
        transaction.setAccountId(accountId);
        transactionDetailRepository.save(transaction);

        BankSlip bankSlip = new BankSlip();
        bankSlip.setAccountId(accountId);
        bankSlip.setAmount(amount);
        bankSlipRepository.save(bankSlip);

        return "Transaction successful.";
    }
}
