package com.example.expense_tracker.service

import com.example.expense_tracker.model.Expense
import com.example.expense_tracker.repository.CategoryRepository
import com.example.expense_tracker.repository.ExpenseRepository
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class ExpenseService(
    private val expenseRepository: ExpenseRepository,
    private val userService: UserService,
    private val categoryRepository: CategoryRepository
) {

    // 1. Add an Expense
    fun addExpense(userId: Long, categoryId: Long, amount: Double, description: String, date: LocalDate): Expense {
        val user = userService.getUserById(userId)
        val category = categoryRepository.findById(categoryId)
            .orElseThrow { IllegalArgumentException("Category not found") }

        // Security Check: Does this category belong to this user?
        if (category.user.id != userId) {
            throw IllegalArgumentException("You cannot use someone else's category!")
        }

        val expense = Expense(
            amount = amount,
            description = description,
            date = date,
            user = user,
            category = category
        )
        return expenseRepository.save(expense)
    }

    // 2. Get all expenses
    fun getExpenses(userId: Long): List<Expense> {
        return expenseRepository.findByUserId(userId)
    }
}

