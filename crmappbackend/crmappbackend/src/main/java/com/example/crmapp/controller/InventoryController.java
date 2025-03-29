package com.example.crmapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.crmapp.model.Inventory;
import com.example.crmapp.service.InventoryService;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // ✅ Admin & Staff can view inventory
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<List<Inventory>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    // ✅ Only Admin can add inventory
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Inventory> addInventory(@RequestBody Inventory inventory) {
        return ResponseEntity.ok(inventoryService.addInventory(inventory));
    }

    // ✅ Only Admin can update stock
    @PutMapping("/{id}/updateStock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateStock(@PathVariable Long id, @RequestParam int newQuantity) {
        inventoryService.updateStock(id, newQuantity);
        return ResponseEntity.ok("Stock updated successfully");
    }
}
