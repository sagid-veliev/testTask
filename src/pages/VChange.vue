<template>
    <to-do-header></to-do-header>
    <modal-window @select=" action ? deleteTaskConfirm() : cancelConfirm() " :show-modal="showModal" />
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
                    @check="checkedInput(item)"  
                >
                    <template #change_btn>
                        <to-do-button
                            color="#033ddd"
                            width="10"
                            button-name="Изменить"
                            @click="changeTask(item)"
                        />
                    </template>
                    <template #delete_btn>
                        <to-do-button
                            color="#f88112"
                            width="10"
                            button-name="Удалить"
                            @click="deleteTask(index)"
                        />
                    </template>
                </to-do-item>
            </template>
            <template #button>
                <div class="block_button">
                    <to-do-button
                        class-name="button_undoredo"
                        color="#a4a8a4"
                        button-name="Отменить"
                        :disabled="oldTasks.length < 2 || !disableUndoRedo"
                        @click="toBack" 
                    ></to-do-button>
                    <to-do-button
                        class-name="button_undoredo"
                        color="#a4a8a4"
                        button-name="Вернуть"
                        :disabled="oldTasks.length < 2 || disableUndoRedo"
                        @click="toNext" 
                    ></to-do-button>
                </div>
                <to-do-button
                    class-name="button_cancel"
                    color="#ff352e"
                    button-name="Отменить редактирование"
                    @click="cancelChanges"
                ></to-do-button>
            </template>
        </to-do-list>
    </div>
    <router-view></router-view>
</template>

<script setup>

import { ref, reactive, computed, watch, onMounted } from 'vue';
import tasksActions from '@/mixins/tasksActions'; 

const { tasks, showModal, getTask, deleteTask, deleteTaskConfirm } = tasksActions();

const oldTasks = reactive([]);

const nameButton = ref("Создать");
const disableUndoRedo = ref(true); 
const active = ref(false);
const action = ref(true);
let editedTask = "";

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

const toBack = () => {
    tasks.value = oldTasks[0];
    disableUndoRedo.value = false;
}

const toNext = () => {
    tasks.value = oldTasks[0];
    disableUndoRedo.value = true;
}

//проставление чекбокса
const checkedInput = (item) => {
    item.checked = !item.checked;
}
//изменение кнопки
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