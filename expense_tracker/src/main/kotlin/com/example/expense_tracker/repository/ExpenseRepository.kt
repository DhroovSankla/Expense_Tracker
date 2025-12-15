package com.example.expense_tracker.repository

import com.example.expense_tracker.model.Expense
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface ExpenseRepository : JpaRepository<Expense, Long> {
    // 1. Get all expenses for a user
    fun findByUserId(userId: Long): List<Expense>

    // 2. Get expenses between two dates (e.g., "Show me November")
    fun findByUserIdAndDateBetween(userId: Long, startDate: LocalDate, endDate: LocalDate): List<Expense>
}