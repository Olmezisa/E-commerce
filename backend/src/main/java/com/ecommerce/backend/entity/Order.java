package com.ecommerce.backend.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;  // the purchasing user :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller; // the owner of the products purchased :contentReference[oaicite:2]{index=2}:contentReference[oaicite:3]{index=3}

    @Column(name = "payment_intent_id", nullable = false, unique = true)
    private String paymentIntentId;
 
    public String getPaymentIntentId() { return paymentIntentId; }
    public void setPaymentIntentId(String paymentIntentId) { this.paymentIntentId = paymentIntentId; }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status; // :contentReference[oaicite:4]{index=4}:contentReference[oaicite:5]{index=5}

    @Column(nullable = false)
    private BigDecimal totalAmount;

    @PostPersist @PostUpdate
    private void calculateTotal() {
    this.totalAmount = 
      items.stream()
           .map(i -> i.getUnitPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
           .reduce(BigDecimal.ZERO, BigDecimal::add);
        }

    

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    public User getBuyer() {
        return buyer;
    }
    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public List<OrderItem> getItems() {
        return items;
    }
    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
    public User getSeller() {
        return seller;
    }
    public void setSeller(User seller) {
        this.seller = seller;
    }
    public OrderStatus getStatus() {
        return status;
    }
    public void setStatus(OrderStatus status) {
        this.status = status;
    }
    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
}
