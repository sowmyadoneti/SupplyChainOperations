package com.example.crmapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.crmapp.model.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
}

