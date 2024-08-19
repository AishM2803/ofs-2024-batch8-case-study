package com.ofss.main.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ofss.main.domain.LoginDetail;

@Repository
public interface LoginDetailRepository extends JpaRepository<LoginDetail, Long> {
    LoginDetail findByUsername(String username);
}
