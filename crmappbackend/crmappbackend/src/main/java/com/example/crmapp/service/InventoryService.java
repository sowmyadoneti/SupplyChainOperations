package com.example.crmapp.service;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;
import com.example.crmapp.model.Inventory;
import com.example.crmapp.repository.InventoryRepository;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository repository;

    private static final Set<WebSocketSession> sessions = new CopyOnWriteArraySet<>();

    public List<Inventory> getAllInventory() {
        return repository.findAll();
    }

    public Inventory addInventory(Inventory inventory) {
        Inventory savedItem = repository.save(inventory);
        checkStockAlert(savedItem);
        return savedItem;
    }

    public void updateStock(Long id, int newQuantity) {
        Inventory inventory = repository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        inventory.setStockQuantity(newQuantity);
        repository.save(inventory);
        checkStockAlert(inventory);
    }

    private void checkStockAlert(Inventory inventory) {
        if (inventory.getStockQuantity() < inventory.getThreshold()) {
            sendStockAlert("Stock Alert: " + inventory.getProductName() + " is low!");
        }
    }

    private void sendStockAlert(String message) {
        for (WebSocketSession session : sessions) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static void addSession(WebSocketSession session) {
        sessions.add(session);
    }

    public static void removeSession(WebSocketSession session) {
        sessions.remove(session);
    }
}
