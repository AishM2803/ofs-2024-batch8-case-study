package com.ofss.main.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "bank_slip")
public class BankSlip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slip_id")
    private Integer slipId;

    @Column(name = "slip_date")
    private java.sql.Timestamp slipDate;

    @Column(name = "account_id")
    private Integer accountId;

    @Column(name = "amount")
    private Double amount;

    // Getters and Setters
    public Integer getSlipId() {
        return slipId;
    }

    public void setSlipId(Integer slipId) {
        this.slipId = slipId;
    }

    public java.sql.Timestamp getSlipDate() {
        return slipDate;
    }

    public void setSlipDate(java.sql.Timestamp slipDate) {
        this.slipDate = slipDate;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
