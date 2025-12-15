package com.example.expense_tracker.repository

import com.example.expense_tracker.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface UserRepository : JpaRepository<User, Long> {
    // Magic Method: Spring sees "findByEmail" and automatically writes:
    // "SELECT * FROM users WHERE email = ?"
    fun findByEmail(email: String): Optional<User>
}