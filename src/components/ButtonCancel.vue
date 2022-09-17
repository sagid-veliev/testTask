<template>
    <button @click="cancelChanges" class="button_cancel">Отменить редактирование</button>
</template>
<script setup>
    const emit = defineEmits(["cancel"]);
    const cancelChanges = () => {
        emit('cancel');
    }
</script>
<style lang="scss" scoped>
    .button_cancel {
        height: 38px;
        width: 25%;
        color:white;
        border: none;
        border: 1px solid  #ff352e;
        background-color: #ff352e;
        font-weight: 400;
        font-family: "Source Sans Pro";
        font-size: 15px;
        border-radius: 5px;
        transition: 0.2s;
        overflow: hidden;
        user-select: none;
        &:hover {
            background-color: #d2100a;
            border: 1px solid rgba(0, 0, 0, 0);
            color: white;
            cursor: pointer;
        }
    }
</style>