// composables/useTasks.ts
import { ref, computed, watch } from "vue";

export interface Task {
    id: number;
    title: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
}

export function useTasks() {
    const tasks = ref<Task[]>([]);

    const addTask = (title: string, priority: "low" | "medium" | "high") => {
        tasks.value.push({
            id: Date.now(),
            title,
            priority,
            completed: false,
        });
    };

    const deleteTask = (id: number) => {
        tasks.value = tasks.value.filter((task) => task.id !== id);
    };

    const toggleTaskCompletion = (id: number) => {
        const task = tasks.value.find((task) => task.id === id);
        if (task) task.completed = !task.completed;
    };

    const sortedTasks = computed(() => {
        return [...tasks.value].sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    });

    const uncompletedCount = computed(
        () => tasks.value.filter((task) => !task.completed).length
    );

    watch(tasks, () => {
        console.log("Tasks list updated:", tasks.value);
    });

    return {
        tasks,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        sortedTasks,
        uncompletedCount,
    };
}
