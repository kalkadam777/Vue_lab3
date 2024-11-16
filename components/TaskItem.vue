<template>
    <li :class="{ completed: task.completed, high: task.priority === 'high' }">
        <div>
            <input type="checkbox" v-model="task.completed" />
            <span @dblclick="editMode = true" v-if="!editMode">{{
                task.title
            }}</span>
            <input
                v-if="editMode"
                v-model="task.title"
                @blur="editMode = false"
                @keydown.enter="editMode = false"
            />
            <small>({{ task.priority }})</small>
        </div>
        <button @click="onDelete">Delete</button>
    </li>
</template>

<script lang="ts" setup>
import type { Task } from "~/composables/useTasks";
import { ref } from "vue";

const props = defineProps<{ task: Task }>();
const task = props.task;
const emit = defineEmits(["delete"]);

const editMode = ref(false);

function onDelete() {
    emit("delete", task.id);
}
</script>

<style scoped>
li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

li.completed span {
    text-decoration: line-through;
}

li.high {
    background-color: #ffe6e6;
}
</style>
