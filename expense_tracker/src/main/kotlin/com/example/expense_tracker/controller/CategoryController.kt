package com.example.expense_tracker.controller

import com.example.expense_tracker.model.Category
import com.example.expense_tracker.service.CategoryService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/categories")
@CrossOrigin
class CategoryController(private val categoryService: CategoryService) {

    // Simple DTO (Data Transfer Object) to handle incoming JSON
    data class CategoryRequest(val userId: Long, val name: String)

    @PostMapping
    fun createCategory(@RequestBody request: CategoryRequest): ResponseEntity<Category> {
        return ResponseEntity.ok(
            categoryService.createCategory(request.userId, request.name)
        )
    }

    @GetMapping("/user/{userId}")
    fun getCategories(@PathVariable userId: Long): ResponseEntity<List<Category>> {
        return ResponseEntity.ok(categoryService.getCategoriesForUser(userId))
    }
}

