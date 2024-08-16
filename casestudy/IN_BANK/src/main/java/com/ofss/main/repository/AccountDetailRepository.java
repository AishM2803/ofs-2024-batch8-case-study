package com.ofss.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ofss.main.domain.AccountDetail;

import java.util.Optional;

@Repository
public interface AccountDetailRepository extends JpaRepository<AccountDetail, Integer> {
    Optional<AccountDetail> findByCustomerId(Long customerId);
}
