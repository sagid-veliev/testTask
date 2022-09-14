<template>
    <div class="todo_list">
        <div class="todo_list_header">
            ToDoList
        </div>
        <div class="todo_list_form">
            <ToDoForm @addTask="getTask"/>
        </div>
        <div class="todo_list_items">
            <ToDoItem 
            v-for="item in tasks" 
            :key="item.id" 
            :task="item.task"
            :id="'' + item.id"    
        />
        </div>
    </div>
</template>

<script setup>
import ToDoItem from './ToDoItem.vue';
import ToDoForm from './ToDoForm.vue';
import { ref } from 'vue';

const tasks = ref([]);

const getTask = (task) => {
    console.log(task);
    tasks.value.unshift(task);
}


</script>

<style lang="scss" scoped>
   
    .todo_list {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 15px;
        width: 60%;
        height: 90vh;
        margin: auto;
        border-radius: 10px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        &_header {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-weight: 600;
            font-size: 26px;
            font-family: "Source Sans Pro";
            border-radius: 10px 10px 0 0;
            height: 10%;
            background-color: rgba(235, 115, 3, 0.04);
        }
        &_form {
            display: flex;
            width: 90%;
        }
        &_items {
            width: 90%;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
    }
</style>