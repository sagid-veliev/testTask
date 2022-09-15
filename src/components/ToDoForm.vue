<template>
    <div class="todo_form">
        <input 
            v-model.trim="task" 
            class="todo_form_input"
            :class="{ todo_form_input_disabled: props.disabled }"
            :disabled="props.disabled"
            type="text" 
            :placeholder="placeholder" 
        />
        <button 
            @click="addTask"
            class="todo_form_button"
            :class="{ todo_form_button_disabled: props.disabled || task.length === 0 }"
            :disabled="props.disabled || task.length === 0" 
        >
            Создать заметку
        </button>
    </div>
</template>
<script setup>
import { ref, computed, defineEmits, defineProps, } from 'vue';

    const task = ref('');
    const emit = defineEmits(['addTask']);
    const props = defineProps({
        disabled: {
            type: Boolean,
            default: true
        }
    });

    const placeholder = computed(() => {
        return props.disabled ? 'Количество задач не должно превышать - 6!' : 'Введите задачу';
    });

    const addTask = () => {
        emit('addTask',  {
            'id': Math.floor(Math.random() * 100),
            'task': task.value
        });
        task.value = "";
    };

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
            &_disabled {
                background-color: rgb(252, 252, 252);
                border: 1px solid rgb(255, 53, 46);
                color: 1px solid rgb(255, 53, 46);
            }
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