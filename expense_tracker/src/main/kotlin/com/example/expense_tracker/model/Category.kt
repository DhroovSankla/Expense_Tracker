package com.example.expense_tracker.model

import jakarta.persistence.*

@Entity
@Table(name = "categories")
data class Category(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    var name: String = "",

    // This is the Arrow from your drawing: Category -> User
    // Hibernate will create a column named 'user_id' in the database.
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    var user: User = User()
)