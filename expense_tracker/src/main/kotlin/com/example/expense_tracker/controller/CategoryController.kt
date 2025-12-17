package com.example.expense_tracker.controller

import com.example.expense_tracker.model.Category
import com.example.expense_tracker.repository.CategoryRepository
import com.example.expense_tracker.repository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = ["http://localhost:5173"])
class CategoryController(
    private val categoryRepository: CategoryRepository,
    private val userRepository: UserRepository
) {

    @GetMapping("/user/{userId}")
    fun getCategoriesByUser(@PathVariable userId: Long): ResponseEntity<List<Category>> {
        return ResponseEntity.ok(categoryRepository.findByUserId(userId))
    }

    // 1. Define the input shape
    data class CategoryRequest(val name: String, val userId: Long)

    // 2. The Create Endpoint
    @PostMapping
    fun createCategory(@RequestBody request: CategoryRequest): ResponseEntity<Category> {
        val user = userRepository.findById(request.userId)
            .orElseThrow { RuntimeException("User not found") }

        val category = Category(name = request.name, user = user)
        return ResponseEntity.ok(categoryRepository.save(category))
    }
}