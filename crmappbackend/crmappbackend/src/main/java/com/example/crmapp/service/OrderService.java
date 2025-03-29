package com.example.crmapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.crmapp.model.Inventory;
import com.example.crmapp.model.Order;
import com.example.crmapp.repository.InventoryRepository;
import com.example.crmapp.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order placeOrder(Order order) {
        if (order.getInventory() == null || order.getInventory().getId() == null) {
            throw new RuntimeException("Order must be associated with a valid inventory item");
        }

        // ✅ Fetch Inventory by ID from the Database
        Inventory inventory = inventoryRepository.findById(order.getInventory().getId())
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));

        // ✅ Ensure the Product Name is Correctly Retrieved
        if (inventory.getProductName() == null || inventory.getProductName().isEmpty()) {
            throw new RuntimeException("Product name is missing in inventory");
        }

        // ✅ Check Stock Availability
        if (inventory.getStockQuantity() < order.getQuantity()) {
            throw new RuntimeException("Not enough stock available for product: " + inventory.getProductName());
        }

        // ✅ Reduce Inventory Stock
        inventory.setStockQuantity(inventory.getStockQuantity() - order.getQuantity());
        inventoryRepository.save(inventory);

        // ✅ Set Order Details Properly
        order.setInventory(inventory);
        order.setProductName(inventory.getProductName()); // Fix product name issue
        order.setOrderDate(LocalDateTime.now());

        return orderRepository.save(order);
    }
}
