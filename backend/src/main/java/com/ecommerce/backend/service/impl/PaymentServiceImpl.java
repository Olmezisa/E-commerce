package com.ecommerce.backend.service.impl;

import com.ecommerce.backend.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;



@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @Override
    public PaymentIntent retrievePaymentIntent(String paymentIntentId) {
        try {
            return PaymentIntent.retrieve(paymentIntentId);
        } catch (Exception e) {
            throw new RuntimeException("PaymentIntent alınamadı: " + paymentIntentId, e);
        }
    }
    @Override
    public PaymentIntent createPaymentIntent(long amount, String currency) {
        try {
            long minor = amount * 100; // örneğin 24₺ -> 2400 kuruş
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(minor)
                .setCurrency(currency)
                .setAutomaticPaymentMethods(
                    PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                        .setEnabled(true)
                        .build()
                )
                .build();
            return PaymentIntent.create(params);
        } catch (Exception e) {
            throw new RuntimeException("Stripe PaymentIntent oluşturulamadı", e);
        }
    }
}
