package com.example.expense_tracker.service

import com.example.expense_tracker.model.Category
import com.example.expense_tracker.repository.CategoryRepository
import org.springframework.stereotype.Service

@Service
class CategoryService(
    private val categoryRepository: CategoryRepository,
    private val userService: UserService // We need this to link the user!
) {

    // 1. Create a Category for a specific User
    fun createCategory(userId: Long, name: String): Category {
        val user = userService.getUserById(userId) // Step 1: Find the User

        val category = Category( // Step 2: Create the object
            name = name,
            user = user // Link it!
        )
        return categoryRepository.save(category) // Step 3: Save
    }

    // 2. Get all categories for a User
    fun getCategoriesForUser(userId: Long): List<Category> {
        return categoryRepository.findByUserId(userId)
    }
}