import { ref } from 'vue';

export default function tasksActions() {
    const tasks = ref([]);
    const showModal = ref(false);
    let deletedIndex = null;
    //получение задачи
    const getTask = (task) => {
        tasks.value.unshift(task);
    };
    //удаление задачи => открытие модалки
    const deleteTask = (index) => {
        deletedIndex = index;
        showModal.value = !showModal.value;
    };
    //подтверждение удаления задачи
    const deleteTaskConfirm  = () => {
        tasks.value.splice(deletedIndex, 1);
        showModal.value = !showModal.value;
    };

    return {
        tasks,
        showModal,
        getTask,
        deleteTask,
        deleteTaskConfirm
    }
}