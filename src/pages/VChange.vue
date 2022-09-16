<template>
    <modal-window @close="closeModal" @select="deleteTaskConfirm()" :show-modal="showModal" />
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
                <button-redirect page="main" button-name="Перейти на главную" :show-button="showBtn"></button-redirect>
                <button class="button" @click.stop="toBack" :disabled="oldTasks.length < 2 || !disableUndoRedo">Отменить изменение</button>
                <button class="button" @click.stop="toNext" :disabled="oldTasks.length < 2 || disableUndoRedo">Вернуть изменение</button>
                <button-cancel @click="cancelChanges"></button-cancel>
            </template>
        </to-do-list>
    </div>
    <router-view></router-view>
</template>

<script setup>


import { ref, reactive, computed, watch, onMounted } from 'vue';

const oldTasks = reactive([]);
const showModal = ref(false);
const tasks = ref([]);
const nameButton = ref("Создать");
const disableUndoRedo = ref(true); 
const active = ref(false);
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

const toBack = () => {
    tasks.value = oldTasks[0];
    disableUndoRedo.value = false;
}

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
    nameButton.value = "Создать";
    showModal.value = true;
}

const closeModal = () => {
    showModal.value = false;
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
        width: 20%;
        color: #161717;
        border: none;
        border: 1px solid  #161717;
        background-color: white;
        font-family: "Source Sans Pro";
        font-weight: 400;
        font-size: 15px;
        border-radius: 5px;
        transition: 0.2s;
        overflow: hidden;
        user-select: none;
        &:disabled {
            background-color: #868986;
            color: white;
            opacity: 0.3;
        }
        &:hover:not(:disabled) {
            background-color:  #a3a5a3;
            border: 1px solid rgba(0, 0, 0, 0);
            color: white;
            cursor: pointer;
        }
    }
</style>