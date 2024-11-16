<template>
    <div id="app" class="d-flex flex-column min-vh-100 bg-gradient">
        <header class="bg-gradient-primary text-white py-4 shadow-lg">
            <div class="container text-center">
                <h1 class="display-3 fw-bold glow-text">To-Do List</h1>
                <p class="lead fw-light">
                    Plan, organize, and achieve with style
                </p>
            </div>
        </header>

        <main class="flex-grow-1 py-5">
            <div class="container">
                <NuxtPage />
            </div>
        </main>

        <footer class="bg-dark text-white py-3">
            <div class="container text-center">
                <small>
                    © 2024 To-Do List | Made with
                    <i class="fas fa-heart text-danger"></i> and Vue.js
                </small>
            </div>
        </footer>
    </div>
</template>

<script setup></script>

<style scoped>
.bg-gradient {
    background: linear-gradient(45deg, #f3e7e9, #e3eeff);
}

.bg-gradient-primary {
    background: linear-gradient(90deg, #6a11cb, #2575fc);
}

.glow-text {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
        0 0 20px rgba(255, 255, 255, 0.6);
    animation: glow 2s infinite alternate;
}

@keyframes glow {
    from {
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.6);
    }
    to {
        text-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
    }
}

main {
    background: #ffffff;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
}

footer {
    animation: fadeInUp 2s ease-in-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
