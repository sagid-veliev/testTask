<template >
    <button @click="deleteTask" class="button_delete">Удалить</button>
</template>
<script setup>

const emit = defineEmits(['delete-task']);
const deleteTask = () => { emit("delete-task") };

</script>
<style lang="scss" scoped>
    .button_delete  {
        height: 50%;
        width: 70px;
        color: rgb(255, 53, 46);
        border: 2px solid rgb(255, 53, 46);
        background-color: white;
        font-family: "Source Sans Pro";
        font-size: 13px;
        font-weight: 600;
        border-radius: 5px;
        transition: 0.2s ease;
        overflow: hidden;
        &:hover {
            background-color: rgb(255, 53, 46);
            border: 2px solid rgba(0, 0, 0, 0);
            color: white;
            cursor: pointer;
        }
    }

    @media (max-width: 600px) {
        .button_delete {
            width: 100%;
        }
    }
</style>