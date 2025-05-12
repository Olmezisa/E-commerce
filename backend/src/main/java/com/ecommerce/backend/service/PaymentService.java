package com.ecommerce.backend.service;

import com.stripe.model.PaymentIntent;

public interface PaymentService {
    PaymentIntent createPaymentIntent(long amount, String currency);

    PaymentIntent retrievePaymentIntent(String paymentIntentId);
}
