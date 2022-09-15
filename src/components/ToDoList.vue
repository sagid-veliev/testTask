<template>
    <modal-window @delete="deleteTaskConfirm()" :show-modal="showModal" />
    <div class="todo_list">
        <div class="todo_list_header">
            ToDoList
        </div>
        <div class="todo_list_form">
            <to-do-form @addTask="getTask" :disabled="tooManyTasks"/>
        </div>
        <div class="todo_list_items">
            <to-do-item 
                v-for="(item, index) in tasks" 
                :key="item.id" 
                :task="item.task"
                :id="index"
                @delete-task="deleteTask(index)"    
            />
        </div>
        <div class="todo_list_change">
            <button class="todo_list_button">Перейти к изменению</button>
        </div>
    </div>
</template>

<script setup>
import ModalWindow from './ModalWindow.vue';
import ToDoItem from './ToDoItem.vue';
import ToDoForm from './ToDoForm.vue';
import { ref, reactive, computed, } from 'vue';

//data
const showModal = ref(false);
const tasks = reactive([]);
let deletedIndex = ''; 
//methods
const getTask = (task) => {
    tasks.unshift(task);
}

const deleteTask = (index) => {
    deletedIndex = index;
    showModal.value = !showModal.value;
}

const deleteTaskConfirm  = () => {
    tasks.splice(deletedIndex, 1);
    showModal.value = !showModal.value;
}
//computed
const tooManyTasks = computed(() => {
    return tasks.length > 5;
})

</script>

<style lang="scss" scoped>
   
    .todo_list {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 60%;
        border-radius: 10px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        gap: 15px;
        letter-spacing: 1px;
        &_header {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-weight: 600;
            font-size: 26px;
            font-family: "Source Sans Pro";
            border-radius: 10px 10px 0 0;
            background-color: rgba(235, 115, 3, 0.04);
        }
        &_form {
            width: 90%;
        }
        &_items {
            width: 90%;
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 10px;
        }
        &_change {
            display: flex;
            justify-content: flex-end;
            width: 90%;
            margin-bottom: 15px;
            height: 40px;
        }
        &_button {
            height: 44px;
            width: 20%;
            color: rgb(235, 115, 3);
            border: none;
            border: 1px solid rgb(235, 115, 3);
            background-color: white;
            font-weight: 600;
            font-size: 15px;
            border-radius: 5px;
            transition: 0.2s;
            overflow: hidden;
            user-select: none;
            &:hover:not(:disabled) {
                background-color: rgb(235, 115, 3);
                border: 1px solid rgba(0, 0, 0, 0);
                color: white;
                cursor: pointer;
            }
            &_disabled {
                background-color: rgb(255, 255, 255);
                color: rgb(110, 110, 110);
                border: 1px solid rgb(236, 236, 236);
            }
        }
    }
</style>