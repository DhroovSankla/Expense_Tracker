package com.example.expense_tracker.service

import com.example.expense_tracker.model.User
import com.example.expense_tracker.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {

    // 1. Register a new user
    fun registerUser(user: User): User {
        // Business Rule: Check if email already exists
        if (userRepository.findByEmail(user.email).isPresent) {
            throw IllegalArgumentException("Email already exists!")
        }
        return userRepository.save(user)
    }

    // 2. Find a user by ID (Helper for other services)
    fun getUserById(id: Long): User {
        return userRepository.findById(id)
            .orElseThrow { IllegalArgumentException("User not found with ID: $id") }
    }
    // 3. Login Logic
    fun loginUser(email: String, password: String): User {
        val user = userRepository.findByEmail(email)
            .orElseThrow { IllegalArgumentException("User not found") }

        if (user.password != password) {
            throw IllegalArgumentException("Invalid password")
        }

        return user
    }
}