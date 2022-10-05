<template>
    <to-do-header></to-do-header>
    <modal-window @close="closeModal" @select=" action ? deleteTaskConfirm() : cancelConfirm() " :show-modal="showModal" />
    <div class="todo">
        <to-do-list header="To Do List - Change">
            <template #form>
                <to-do-form 
                    @add-task="getTask"
                    @edit-task="editTask" 
                    :disabled="tooManyTasks" 
                    :button-name="nameButton"
                />
            </template>
            <template #items>
                <to-do-item 
                    v-for="(item, index) in tasks"
                    :key="item.id" 
                    :checked="item.checked"
                    :task="item.task"
                    :id="index"
                    :disabled="false"
                    :active="active"
                    @delete-task="deleteTask(index)"
                    @check="checkedInput(item)"  
                >
                    <template #delete_btn>
                        <button-delete @delete-task="deleteTask(index)" />
                    </template>
                    <template #change_btn>
                        <button-change @change-task="changeTask(item)" />
                    </template>
                </to-do-item>
            </template>
            <template #button>
                <div class="block_button">
                    <ToDoButton
                        class-name="button_cancel"
                        color="#ff352e"
                        button-name="Отменить редактирование"
                    ></ToDoButton>
                    <!-- <button class="button" @click.stop="toBack" :disabled="oldTasks.length < 2 || !disableUndoRedo">Отменить изменение</button> -->
                    <button class="button" @click.stop="toNext" :disabled="oldTasks.length < 2 || disableUndoRedo">Вернуть изменение</button>
                </div>
                <button-cancel @click="cancelChanges"></button-cancel>
            </template>
        </to-do-list>
    </div>
    <router-view></router-view>
</template>

<script setup>


import { ref, reactive, computed, watch, onMounted } from 'vue';
import ToDoHeader from '@/components/ToDoHeader.vue';

const oldTasks = reactive([]);
const showModal = ref(false);
const tasks = ref([]);
const nameButton = ref("Создать");
const disableUndoRedo = ref(true); 
const active = ref(false);
const action = ref(true);
let editedTask = "";
let deletedIndex = '';

//отслеживания изменений списка задач, для обновления JSON,
//также заполняю массив двумя последними изменившимися массивами для отмены редактирования и потворения действия 
watch(tasks, (newList) => {
    localStorage.setItem("tasks", JSON.stringify(newList));
    oldTasks.push(JSON.parse(localStorage.getItem("tasks")));
    if(oldTasks.length > 2) {
        oldTasks.shift();
    }
}, { deep: true });

onMounted(() => {
    tasks.value = JSON.parse(localStorage.getItem("tasks")) || [];
});

// const toBack = () => {
//     tasks.value = oldTasks[0];
//     disableUndoRedo.value = false;
// }

const toNext = () => {
    tasks.value = oldTasks[0];
    disableUndoRedo.value = true;
}
//получение задачи
const getTask = (task) => {
    tasks.value.unshift(task);
}
//удаление задачи => открытие модалки
const deleteTask = (index) => {
    deletedIndex = index;
    showModal.value = !showModal.value;
}
//подтверждение удаления задачи
const deleteTaskConfirm  = () => {
    tasks.value.splice(deletedIndex, 1);
    showModal.value = !showModal.value;
}
//проставление чекбокса
const checkedInput = (item) => {
    item.checked = !item.checked;
}
//функция для
const changeTask = (item) => {
    editedTask = item.id;
    nameButton.value = "Редактировать";
}

const editTask = (task) => {
    if(tasks.value) {
        tasks.value.map((item) => {
            if(item.id === editedTask) {
                item.task = task;
            }
        })
    }
    task = "";
}

const cancelChanges = () => {
    action.value = false;
    showModal.value = true;
}

const cancelConfirm = () => {
    nameButton.value = "Создать";
    showModal.value = false;
}

const closeModal = () => {
    showModal.value = false;
}

//computed
const tooManyTasks = computed(() => {
    return tasks.value.length > 4;
})

</script>

<style lang="scss">
    .todo {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .changed {
        background-color: red;
    }

    .button {
        height: 38px;
        width: 100%;
        color: white;
        border: none;
        border: 1px solid  #a4a8a4;
        background-color: #a4a8a4;
        font-family: "Source Sans Pro";
        font-weight: 400;
        font-size: 15px;
        border-radius: 5px;
        transition: 0.2s;
        overflow: hidden;
        user-select: none;
        &:disabled {
            background-color: #a4a8a4;
            color: white;
            opacity: 0.3;
        }
        &:hover:not(:disabled) {
            background-color:  #767776;
            border: 1px solid rgba(0, 0, 0, 0);
            color: white;
            cursor: pointer;
        }
    }

    .block_button {
        width: 50%;
        display: inline-flex;
        gap: 10px;
    }

    @media (max-width: 800px) {
        .todo_list_form {
            display: flex;
            justify-content: center;
        }
    }
</style>