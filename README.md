# 🎬 BookMyShow Clone - Microservices Architecture

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-19-61DAFB)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)
![Kafka](https://img.shields.io/badge/Apache_Kafka-Event_Driven-black)
![Redis](https://img.shields.io/badge/Redis-Seat_Locking-red)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A production-inspired **BookMyShow Clone** built using **Spring Boot Microservices, React, Apache Kafka, Redis, Docker, MySQL, and JWT Authentication**.

The project demonstrates modern distributed system concepts including **event-driven communication, Saga pattern, Redis distributed locking, secure authentication, service discovery, and monitoring**.

---

# 📚 Table of Contents

* Overview
* Architecture
* Features
* Tech Stack
* Microservices
* Booking Workflow
* Redis Seat Locking
* Project Structure
* Screenshots
* Getting Started
* API Overview
* Future Improvements
* Learning Outcomes

---

# 🚀 Overview

This project recreates the core workflow of an online movie ticket booking platform.

Users can:

* Register/Login
* Browse Movies
* View Movie Details
* Select Seats
* Book Tickets
* Cancel Bookings
* View Booking History
* Manage Profile

Administrators can:

* Manage Movies
* View Bookings
* Monitor Payments
* View Dashboard Statistics

The backend follows a **microservices architecture** where services communicate using REST APIs and asynchronous Kafka events.

---

# 🏗 Architecture

```
                    +----------------------+
                    |    React Frontend    |
                    +----------+-----------+
                               |
                               |
                    API Gateway (Spring Cloud)
                               |
        -------------------------------------------------
        |              |              |                |
        |              |              |                |
 User Service     Movie Service   Booking Service   Payment Service
        |              |              |                |
        |              |              |                |
      MySQL          MySQL          MySQL            MySQL
                                      |
                                      |
                                    Redis
                              (Seat Locking)

                              Kafka
                                |
        -------------------------------------------------
        |
 booking-created
 payment-success
 payment-failed
 booking-cancelled


              Eureka Service Discovery
                       |
                    Zipkin Tracing
                       |
              Prometheus + Grafana
```

---

# ✨ Features

## 🔐 Authentication & Security

* User Registration
* User Login
* JWT Authentication
* BCrypt Password Encryption
* Role Based Access Control (USER / ADMIN)
* Protected Admin APIs

---

## 🎬 Movie Management

* Browse Movies
* Movie Details
* Add Movie
* Edit Movie
* Delete Movie
* Admin Movie Management

---

## 💺 Booking System

* Interactive Seat Selection
* Premium / Executive / Regular Seats
* Redis Based Seat Locking
* Booking Creation
* Booking Cancellation
* Booking History

---

## 💳 Payment Service

* Kafka Consumer Implementation
* Payment Processing Simulation
* Payment Success Events
* Payment Failure Events
* Automatic Booking Status Updates

---

## 🛠 Admin Dashboard

* Dashboard Statistics
* Total Movies Count
* Booking Overview
* Payment Monitoring
* Revenue Tracking

---

# ⚙ Tech Stack

## Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* Spring Cloud Gateway
* Eureka Server
* Apache Kafka
* Redis
* MySQL
* Resilience4j
* Docker
* Zipkin
* Prometheus
* Grafana
* Lombok

---

## Frontend

* React 19
* React Router
* Axios
* CSS3
* Tailwind CSS

---

# 🧩 Microservices

## 👤 User Service

Responsibilities:

* User Registration
* Login Authentication
* JWT Token Generation
* Profile Management

---

## 🎬 Movie Service

Responsibilities:

* Movie CRUD Operations
* Movie Information Management
* Admin Movie APIs

---

## 🎟 Booking Service

Responsibilities:

* Create Bookings
* Seat Management
* Redis Seat Locking
* Booking Cancellation
* Kafka Event Publishing

---

## 💳 Payment Service

Responsibilities:

* Consume Booking Events
* Process Payments
* Publish Payment Events

---

# 🔄 Booking Workflow (Saga Pattern)

The booking process uses an event-driven Saga workflow between Booking Service and Payment Service.

```
User Selects Seat

        |
        ↓

Booking Service

        |
        ↓

Redis Seat Lock

        |
        ↓

Create Booking (PENDING)

        |
        ↓

Publish booking-created Event

        |
        ↓

Payment Service

        |
        ↓

Payment Success / Failure Event

        |
        ↓

Booking Service Updates Status


SUCCESS
→ Booking CONFIRMED


FAILURE
→ Booking FAILED
→ Redis Seat Unlock
```

---

# 🔒 Redis Seat Locking

Redis is used for temporary seat reservation to prevent duplicate bookings.

Flow:

```
User Selects Seat

        ↓

Seat Lock Stored in Redis

        ↓

Booking Created

        ↓

Payment Processing

        ↓

Lock Removed After Completion
```

Benefits:

* Prevents double booking
* Provides fast temporary storage
* Supports distributed locking

---

# ❌ Booking Cancellation Flow

When a booking is cancelled:

```
Cancel Booking

        ↓

Update Booking Status

        ↓

Remove Redis Seat Lock

        ↓

Seats Available Again
```

---

# 📂 Project Structure

```
bookmyshow-clone/

frontend/

api-gateway/

eureka-server/

user-service/

movie-service/

booking-service/

payment-service/

docker-compose.yml

README.md
```

---

# 📸 Screenshots

## 🏠 Home Page

Movie discovery interface displaying available movies.

```
docs/screenshots/home.png
```

---

## 🎬 Movie Details & Seat Selection

Complete booking flow with movie information and seat selection.

```
docs/screenshots/movie-details-seat-selection.png
```

---

## ✅ Booking Success

Successful ticket confirmation after booking completion.

```
docs/screenshots/booking-success.png
```

---

## 📊 Admin Dashboard

Dashboard displaying movies, bookings, payments, and revenue statistics.

```
docs/screenshots/admin-dashboard.png
```

---

## 🔄 Saga Workflow

Kafka based booking and payment event communication.

```
docs/screenshots/saga-workflow.png
```

---

## 🔒 Redis Seat Locking

Temporary seat reservation using Redis.

```
docs/screenshots/redis-seat-locking.png
```

---

## ❌ Redis Seat Unlocking

Seat release after booking cancellation.

```
docs/screenshots/redis-seat-unlock.png
```

---

## 🔎 Eureka Dashboard

Microservice registration and service discovery.

```
docs/screenshots/eureka-dashboard.png
```

---

## 📈 Grafana Dashboard

Application metrics and monitoring dashboard.

```
docs/screenshots/grafana-dashboard.png
```

---

# ▶ Running the Project

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/bookmyshow-clone.git

cd bookmyshow-clone
```

---

## Start Infrastructure

```bash
docker compose up -d
```

---

## Start Backend Services

Start services in the following order:

1. Eureka Server
2. API Gateway
3. User Service
4. Movie Service
5. Booking Service
6. Payment Service

---

## Start Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 📡 API Overview

## User Service

```
POST /api/users/register

POST /api/users/login

GET /api/users/profile
```

---

## Movie Service

```
GET    /api/movies

GET    /api/movies/{id}

POST   /api/movies

PUT    /api/movies/{id}

DELETE /api/movies/{id}
```

---

## Booking Service

```
POST /api/bookings

GET /api/bookings

GET /api/bookings/{id}

PUT /api/bookings/{id}/cancel
```

---

## Payment Service

```
GET /api/payments
```

---

# 🔮 Future Improvements

* Real Payment Gateway Integration
* QR Code Ticket Generation
* Email Notifications
* Theatre & Show Management
* Search and Filters
* Cloud Deployment
* Kubernetes Deployment
* CI/CD Pipeline
* Advanced Analytics

---

# 🎯 Learning Outcomes

This project strengthened my understanding of:

* Microservices Architecture
* Event Driven Systems
* Apache Kafka
* Saga Pattern
* Redis Distributed Locking
* Spring Security JWT Authentication
* Role Based Access Control
* API Gateway
* Eureka Service Discovery
* Docker Containerization
* Distributed Transactions
* Resilience4j Circuit Breaker
* Prometheus and Grafana Monitoring
* React Application Development

---
