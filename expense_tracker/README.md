# 💰 Personal Expense Tracker

A full-stack financial management dashboard built to track daily spending, visualize expenses by category, and manage budgets dynamically.

## 🚀 Tech Stack
* **Frontend:** React.js, Vite, Recharts (Data Visualization), Axios
* **Backend:** Spring Boot, Kotlin
* **Database:** MySQL, Hibernate JPA
* **Tools:** Postman, IntelliJ IDEA, VS Code

## ✨ Key Features
* **Dashboard Analytics:** Real-time calculation of total expenses and a visual breakdown (Donut Chart) of spending habits.
* **Dynamic Search & Filter:** Instantly filter expenses by name (e.g., "Fuel", "Party") with reactive total calculation.
* **Category Management:** Users can create custom categories on the fly, stored permanently in the relational database.
* **Secure Data Handling:** Multi-user architecture ensures users only see their own financial data (User ID based fetching).
* **CRUD Operations:** Full capability to Create, Read, and Delete expenses with database synchronization.

## 🧠 Challenges Solved
* **CORS Configuration:** Implemented a Global WebConfig in Spring Boot to resolve Cross-Origin Resource Sharing issues between the React frontend and Kotlin backend.
* **State Management:** Managed complex frontend state to ensure the "Total Expenses" card updates instantly when an item is deleted or filtered.
* **Relational Mapping:** Designed a normalized MySQL schema linking `Users` -> `Categories` -> `Expenses` using Foreign Keys.

## 📸 Screenshots
*(You can upload your screenshots here later)*