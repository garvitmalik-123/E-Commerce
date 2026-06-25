package com.ecommerce.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {

    @Data
    public static class PlaceOrderRequest {
        private String shippingAddress;
    }

    @Data
    public static class OrderResponse {
        private Long id;
        private BigDecimal totalAmount;
        private String status;
        private String paymentStatus;
        private String shippingAddress;
        private LocalDateTime createdAt;
        private List<OrderItemResponse> items;
    }

    @Data
    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private String productImage;
        private Integer quantity;
        private BigDecimal price;
    }
}
