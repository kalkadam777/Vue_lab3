<template>
    <div class="task-manager">
        <div class="card shadow border-0 mb-4">
            <div class="card-body">
                <h2 class="card-title mb-3 text-center">Add New Task</h2>
                <form
                    @submit.prevent="addNewTask"
                    class="d-flex flex-column gap-3"
                >
                    <input
                        v-model="newTaskTitle"
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Task Title"
                        required
                    />
                    <select
                        v-model="newTaskPriority"
                        class="form-select form-select-lg"
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <button class="btn btn-primary btn-lg w-100">
                        <i class="fas fa-plus-circle"></i> Add Task
                    </button>
                </form>
            </div>
        </div>

        <div class="task-list">
            <transition-group name="task-list" tag="div" class="row g-3">
                <div
                    v-for="task in sortedTasks"
                    :key="task.id"
                    :class="[
                        'card',
                        'shadow-sm',
                        'border-0',
                        'p-3',
                        getPriorityClass(task.priority),
                    ]"
                >
                    <div
                        class="d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <h5
                                class="mb-1"
                                :class="{
                                    'text-decoration-line-through':
                                        task.completed,
                                }"
                            >
                                {{ task.title }}
                            </h5>
                            <small class="text-muted">{{
                                task.priority
                            }}</small>
                        </div>
                        <div class="actions">
                            <button
                                class="btn btn-success btn-sm"
                                @click="toggleTaskCompletion(task.id)"
                            >
                                <i
                                    :class="[
                                        'fas',
                                        task.completed ? 'fa-undo' : 'fa-check',
                                    ]"
                                ></i>
                            </button>
                            <button
                                class="btn btn-danger btn-sm"
                                @click="deleteTask(task.id)"
                            >
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>

        <div class="summary mt-4 text-center">
            <p class="text-muted">
                <strong>{{ uncompletedCount }}</strong> tasks remaining
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from "vue";
import { useTasks } from "~/composables/useTasks";

const {
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompletion,
    sortedTasks,
    uncompletedCount,
} = useTasks();

const newTaskTitle = ref("");
const newTaskPriority = ref<"low" | "medium" | "high">("low");

const addNewTask = async () => {
    if (!newTaskTitle.value) return;
    addTask(newTaskTitle.value, newTaskPriority.value);
    newTaskTitle.value = "";
    newTaskPriority.value = "low";

    await nextTick();
    const lastTask = document.querySelector(".task-list div:last-child");
    lastTask?.scrollIntoView({ behavior: "smooth" });
};

const getPriorityClass = (priority: "low" | "medium" | "high") => {
    switch (priority) {
        case "low":
            return "low";
        case "medium":
            return "medium";
        case "high":
            return "high";
        default:
            return "";
    }
};
</script>

<style>
/* Анимация задач */
.task-list-enter-active,
.task-list-leave-active {
    transition: all 0.3s ease-in-out;
}

.task-list-enter-from {
    opacity: 0;
    transform: translateY(-20px);
}

.task-list-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

/* Цвета для приоритетов */
.card.low {
    border-left: 5px solid #28a745 !important;
    background-color: #e9f7ef !important;
}

.card.medium {
    border-left: 5px solid #ffc107 !important;
    background-color: #fff8e1 !important;
}

.card.high {
    border-left: 5px solid #dc3545 !important;
    background-color: #f8d7da !important;
}

/* Иконки действий */
.actions .btn {
    margin-left: 5px;
}
</style>
