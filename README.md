# Battery Management Product Portfolio System

## Overview
The **Battery Management Product Portfolio System** is a .NET-based application designed to manage and visualize a catalog of battery-related products. It provides a structured interface for handling inventory, editing product data, and simulating a cart-based workflow.

This project serves as a comprehensive portfolio demonstration of full-stack development skills. It acts as a functional prototype for an inventory management system while providing a robust foundation for building scalable Battery Management System (BMS) applications in the future.

---

## Objectives
The primary objective of this system is to implement a highly modular and maintainable product management architecture. It aims to provide complete CRUD (Create, Read, Update, Delete) functionality for seamless inventory handling. Additionally, the project simulates realistic cart-based workflows suitable for product allocation or purchasing scenarios. It also focuses on demonstrating modern UI/UX design practices, specifically through the inclusion of a fully integrated dark mode, all while ensuring the system remains extensible for future backend and database integrations.

---

## 🧱 System Architecture

[ Presentation Layer (React UI) ]
↓
[ Application Logic Layer ]
↓
[ Data Management Layer ]
↓
[ Storage (Local State / Future DB Integration) ]

### Design Principles
The system is built on core design principles that prioritize long-term sustainability. It strictly adheres to the separation of concerns, ensuring that different layers of the application operate independently. The frontend utilizes a component-based UI approach to maximize code reusability. Furthermore, the overall design relies on a scalable architecture paired with an extensible data layer, allowing the application to grow and adapt to more complex data requirements over time.

---

## ⚙️ Technology Stack
| Layer        | Technology            |
|-------------|----------------------|
| Backend     | .NET Framework       |
| Frontend    | React (adiReact)     |
| UI/UX       | Custom CSS + Dark Mode |
| State Mgmt  | React Hooks (extendable) |

---

## Features

### 📋 Product Listing
The Product Listing feature offers a comprehensive view of the inventory by displaying all available battery products within a clean, structured layout. It is specifically designed to support scalable product attributes, ensuring that as new technical specifications are added, the user interface can adapt effortlessly.

---

### ➕ Add New Listing
Adding a new listing is handled through an intuitive, form-based product creation interface. To maintain data integrity, the system performs strict input validation before any submission is processed. Furthermore, the form is built with easily extendable fields, making it simple for administrators to track specific metrics like voltage, capacity, or other future battery specifications.

<div align="center">
  <img src="https://github.com/Marsyleeno/Battery-Management-Product-Portfolio-Idea-/blob/main/adiReact/add-listing.png"/>
</div>

---

### ✏️ Edit Products
The Edit Products feature empowers users to quickly modify existing product entries as inventory details change. It guarantees that any adjustments are reflected immediately through real-time updates and seamless state synchronization across the entire application.

<div align="center">
  <img src="https://github.com/Marsyleeno/Battery-Management-Product-Portfolio-Idea-/blob/main/adiReact/edit-listing.png"/>
</div>

---

### 🛒 Cart / Inventory Allocation
Users can interact with a dynamic cart system by seamlessly adding products to their queue. This feature effectively simulates both a standard purchasing workflow and an internal inventory allocation process. Looking ahead, future enhancements are planned to expand this module by introducing precise quantity tracking, dynamic pricing logic, and a fully functional checkout system.

**Future Enhancements:**
- Quantity tracking
- Pricing logic
- Checkout system

<div align="center">
  <img src="https://github.com/Marsyleeno/Battery-Management-Product-Portfolio-Idea-/blob/main/adiReact/shopping%20cart.png"/>
</div>

---

### Dark Mode UI
To enhance user experience, the application includes a dedicated Dark Mode UI. This feature significantly improves usability and reduces eye strain in low-light environments, maintaining consistent and aesthetically pleasing theming across all interactive components.

<div align="center">
  <img src="https://github.com/Marsyleeno/Battery-Management-Product-Portfolio-Idea-/blob/main/adiReact/dark-mode.png"/>
</div>

---

### 🖥️ Default Dashboard
The Default Dashboard provides a quick and clear overview of all current product listings the moment a user accesses the application.

<div align="center">
  <img src="https://github.com/Marsyleeno/Battery-Management-Product-Portfolio-Idea-/blob/main/adiReact/default-view.png"/>
</div>

---

📄 License
This project is open-source and available for modification and distribution.
