package com.example.expense_tracker.model

import jakarta.persistence.*

@Entity
@Table(name = "users") // We use plural "users" to be safe with SQL keywords
data class User(

    // 1. The ID Card (Primary Key)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    // 2. The Data
    @Column(unique = true, nullable = false)
    var username: String = "",

    @Column(unique = true, nullable = false)
    var email: String = "",

    // We add this because you penciled it in later
    @Column(nullable = false)
    var password: String = ""
)