<template>
    <to-do-header></to-do-header>
    <modal-window @select="deleteTaskConfirm" @close="closeModal" :show-modal="showModal" />
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
            <template #button>
                <ButtonRedirect page="change" :show-button="showBtn"></ButtonRedirect>
            </template>
        </to-do-list>
    </div>
</template>

<script setup>

import { ref, computed, watch, onMounted } from 'vue';

//data
const showModal = ref(false);
const tasks = ref([]);
let deletedIndex = '';

watch(tasks, (newList) => {
    localStorage.setItem("tasks", JSON.stringify(newList));
}, { deep: true });

onMounted(() => {
    tasks.value = JSON.parse(localStorage.getItem("tasks")) || [];
});

//methods
const getTask = (task) => {
    tasks.value.unshift(task);
};

const deleteTask = (index) => {
    deletedIndex = index;
    showModal.value = !showModal.value;
};

const deleteTaskConfirm  = () => {
    tasks.value.splice(deletedIndex, 1);
    showModal.value = !showModal.value;
};

//computed
const tooManyTasks = computed(() => {
    return tasks.value.length > 4;
});

const showBtn = computed(() => {
    return Boolean(tasks.value.length);
});

const closeModal = () => {
    showModal.value = !showModal.value;
};

</script>

<style lang="scss">
    .todo {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>