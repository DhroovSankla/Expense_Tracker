package com.example.expense_tracker.repository

import com.example.expense_tracker.model.Category
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CategoryRepository : JpaRepository<Category, Long> {
    // Find all categories belonging to a specific user ID
    fun findByUserId(userId: Long): List<Category>
}

