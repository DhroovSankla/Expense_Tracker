package com.example.expense_tracker.model

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "expenses")
data class Expense(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var amount: Double = 0.0,
    var description: String = "",
    var date: LocalDate = LocalDate.now(),

    // Arrow 1: Who spent the money?
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    var user: User = User(),

    // Arrow 2: What category is it?
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    var category: Category = Category()
)

