<template>
    <modal-window @delete="deleteTaskConfirm()" :show-modal="showModal" />
    <div class="todo">
        <to-do-list header="To Do List">
            <template #form>
                <to-do-form @addTask="getTask" :disabled="tooManyTasks"/>
            </template>
            <template #items>
                <to-do-item 
                    v-for="(item, index) in tasks" 
                    :checked="item.checked"
                    :key="item.id" 
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
}, { deep: true })

onMounted(() => {
    tasks.value = JSON.parse(localStorage.getItem("tasks")) || [];
});

//methods
const getTask = (task) => {
    tasks.value.unshift(task);
}

const deleteTask = (index) => {
    deletedIndex = index;
    showModal.value = !showModal.value;
}

const deleteTaskConfirm  = () => {
    tasks.value.splice(deletedIndex, 1);
    showModal.value = !showModal.value;
}

//computed
const tooManyTasks = computed(() => {
    return tasks.value.length > 4;
})

const showBtn = computed(() => {
    return Boolean(tasks.value.length);
})

</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;
    }

    @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400, 600;
        src: url(https://fonts.gstatic.com/s/sourcesanspro/v21/6xK3dSBYKcSV-LCoeQqfX1RYOo3qPK7lqDY.woff2) format('woff2');
        unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        font-display: swap;
    }

    @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/sourcesanspro/v21/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7l.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    .todo {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>