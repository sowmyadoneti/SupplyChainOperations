package com.example.crmapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.crmapp.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
