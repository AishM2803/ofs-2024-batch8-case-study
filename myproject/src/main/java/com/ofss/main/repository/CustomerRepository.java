package com.ofss.main.repository;

import org.springframework.data.repository.CrudRepository;
import com.ofss.main.domain.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Integer> {
    Customer findByUsername(String username);
}
