<template>
    <to-do-header></to-do-header>
    <modal-window @select="deleteTaskConfirm" :show-modal="showModal" />
    <div class="todo">
        <to-do-list header="To Do List">
            <template #form>
                <to-do-form @addTask="getTask" :disabled="tooManyTasks"/>
            </template>
            <template #items>

                <to-do-item
                    v-for="(item, index) in tasks" 
                    :key="item.id" 
                    :checked="item.checked"
                    :task="item.task"
                    :id="index"
                    :disabled="true"    
                >
                    <template #delete_btn>
                        <ButtonDelete @delete-task="deleteTask(index)" />
                    </template>
                </to-do-item>
            </template>
        </to-do-list>
    </div>
</template>

<script setup>

import { computed, watch, onMounted } from 'vue';
import tasksActions from '@/mixins/tasksActions'; 

const { tasks, showModal, getTask, deleteTask, deleteTaskConfirm } = tasksActions();

watch(tasks, (newList) => {
    localStorage.setItem("tasks", JSON.stringify(newList));
}, { deep: true });

onMounted(() => {
    tasks.value = JSON.parse(localStorage.getItem("tasks")) || [];
});

//computed
const tooManyTasks = computed(() => {
    return tasks.value.length > 4;
});

</script>

<style lang="scss">
    .todo {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>