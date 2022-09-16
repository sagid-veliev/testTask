<template>
    <button @click="cancelChanges" class="button_cancel">Отменить изменения</button>
</template>
<script setup>
    import { defineEmits } from "vue";

    const emit = defineEmits(["cancel"]);
    const cancelChanges = () => {
        emit('cancel');
    }
</script>
<style lang="scss" scoped>
    .button_cancel {
        height: 38px;
        width: 25%;
        color: #baa226;
        border: none;
        border: 1px solid  #baa226;
        background-color: white;
        font-weight: 400;
        font-family: "Source Sans Pro";
        font-size: 12px;
        border-radius: 5px;
        transition: 0.2s;
        overflow: hidden;
        user-select: none;
        &:hover {
            background-color: #baa226;
            border: 1px solid rgba(0, 0, 0, 0);
            color: white;
            cursor: pointer;
        }
    }
</style>