package com.example.expense_tracker.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebConfig : WebMvcConfigurer {

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**") // Allow ALL paths
            .allowedOrigins("http://localhost:5173") // Allow Frontend
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow all actions
            .allowedHeaders("*")
            .allowCredentials(true)
    }
}