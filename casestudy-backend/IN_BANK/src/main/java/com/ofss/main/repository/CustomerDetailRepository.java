package com.ofss.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ofss.main.domain.CustomerDetail;

@Repository
public interface CustomerDetailRepository extends JpaRepository<CustomerDetail,Long> {
    CustomerDetail findByUsername(String username);
}
