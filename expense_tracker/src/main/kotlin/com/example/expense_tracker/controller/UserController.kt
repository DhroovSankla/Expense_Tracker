package com.example.expense_tracker.controller

import com.example.expense_tracker.model.User
import com.example.expense_tracker.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
@CrossOrigin // Allow React to talk to us later
class UserController(private val userService: UserService) {

    @PostMapping("/register")
    fun register(@RequestBody user: User): ResponseEntity<User> {
        return ResponseEntity.ok(userService.registerUser(user))
    }

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: Long): ResponseEntity<User> {
        return ResponseEntity.ok(userService.getUserById(id))
    }

    data class LoginRequest(val email: String, val password: String)

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<User> {
        return ResponseEntity.ok(userService.loginUser(request.email, request.password))
    }
}

