<template>
    <div class="todo_form">
        <input v-model.trim="task" type="text" placeholder="Введите текст" class="todo_form_input"/>
        <button @click.enter="addTask" class="todo_form_button todo_form_button">Создать заметку</button>
    </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue';

    const task = ref('');
    const emit = defineEmits(['addTask']);

    const addTask = () => {
        emit('addTask',  {
            'id': (Math.random() * 10).toPrecision(3),
            'task': task.value
        });
    }

</script>
<style lang="scss">
    .todo_form {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 60px;
        border-radius: 5px;
        background-color: #f6f6f6;
        box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
        gap: 10px;
        &_input {
            width: 70%;
            line-height: 40px;
            overflow: hidden;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            height: 40px;
            font-family: "Source Sans Pro";
            font-weight: 400;
            padding: 0 10px;
            font-size: 16px;
            line-height: 30px;
            border: none;
            outline: none;   
            resize: none;
            border: 1px solid rgba(0, 0, 0, 0);
            &:focus {
                border: 1px solid #f88112;;
            }
        }
        &_button {
            height: 40px;
            width: 20%;
            color: rgb(235, 115, 3);
            border: 1px solid rgb(235, 115, 3);
            background-color: white;
            font-size: 15px;
            border-radius: 5px;
            transition: 0.2s;
            overflow: hidden;
            &:hover {
                background-color: rgb(235, 115, 3);
                border: 1px solid rgba(0, 0, 0, 0);
                color: white;
                cursor: pointer;
            }
        }
    }
    
</style>