package com.example.expense_tracker.controller

import com.example.expense_tracker.model.Expense
import com.example.expense_tracker.repository.ExpenseRepository
import com.example.expense_tracker.service.ExpenseService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
class ExpenseController(private val expenseService: ExpenseService,private val expenseRepository: ExpenseRepository) {

    // DTO: What the Frontend sends us
    data class ExpenseRequest(
        val userId: Long,
        val categoryId: Long,
        val amount: Double,
        val description: String,
        val date: LocalDate
    )

    @PostMapping
    fun addExpense(@RequestBody request: ExpenseRequest): ResponseEntity<Expense> {
        return ResponseEntity.ok(
            expenseService.addExpense(
                request.userId,
                request.categoryId,
                request.amount,
                request.description,
                request.date
            )
        )
    }

    @GetMapping("/user/{userId}")
    fun getExpenses(@PathVariable userId: Long): ResponseEntity<List<Expense>> {
        return ResponseEntity.ok(expenseService.getExpenses(userId))
    }

    @DeleteMapping("/{id}")
    fun deleteExpense(@PathVariable id: Long): ResponseEntity<Void> {
        // Use lowercase 'expenseRepository' variable
        return if (expenseRepository.existsById(id)) {
            expenseRepository.deleteById(id)
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}

