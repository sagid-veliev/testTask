<template>
    <div class="todo_item">
        <div class="container">
            <input 
                type="checkbox"
                class="container_checkbox" 
                name="task" 
                :id="id"
            />
            <label class="container_task" :for="id">{{ props.task }}</label>
            <button @click.stop="deleteTask" class="container_delete">Удалить</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits} from 'vue';

const emit = defineEmits(['delete-task']);

const props = defineProps({
    task: String,
    id: String,
    disabled: Boolean
});

const deleteTask = () => {
    emit('delete-task');
}


</script>

<style lang="scss" scoped>

    $color: #f88112;
    
    .todo_item {
        display: flex;
        justify-content: center;
        background-color: #FFFEFB;
        min-height: 10vh;
        width: 100%;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }

    .container {
        display: flex;
        align-items: center;
        width: 95%;
        overflow: hidden;
        &_checkbox {
            position: absolute;
            z-index: -1;
            opacity: 0;
        }
        &_checkbox+label {
            display: inline-flex;
            align-items: center;
            user-select: none;
            cursor: pointer;
            height: 90%;
        }
        &_checkbox+label::before {
            content: '';
            display: inline-flex;
            min-width: 20px;
            height: 20px;
            border: 1px solid #adb5bd;
            border-radius: 5px;
            margin-right: 20px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            background-size: 70%;
        }
        &_checkbox:checked+label::before {
            border-color:  $color;
            background-color:  $color;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
        }
        &_checkbox:not(:disabled):not(:checked)+label:hover::before {
            border-color:  $color;
        }
        &_checkbox:not(:disabled):not(:checked)+label:hover::before {
            border-color:  $color;
        }
        &_checkbox:not(:disabled):active+label::before {
            background-color:  $color;
            border-color:  $color;
        }
        &_checkbox:disabled+label::before {
            background-color:  $color;
            opacity: 0.4;
            cursor: default;
        }
        &_task {
            width: 90%;
            font-family: "Source Sans Pro";
            font-weight: 600;
            font-size: 20px;
            line-height: 20px;
            height: 100%;
            word-break: break-all;
        }
        &_delete {
            height: 40px;
            width: 70px;
            color: rgb(255, 53, 46);
            border: 2px solid rgb(255, 53, 46);
            background-color: white;
            font-size: 13px;
            font-weight: 600;
            border-radius: 5px;
            transition: 0.2s ease;
            overflow: hidden;
            &:hover {
                background-color: rgb(255, 53, 46);
                border: 1px solid rgba(0, 0, 0, 0);
                color: white;
                cursor: pointer;
            }
        }
    }
</style>