<template >
    <button @click="changeTask" class="button_change">Изменить</button>
</template>

<script setup>
    import { defineEmits } from "vue";
    const emit = defineEmits(["change-task"]);
    const changeTask = () => { emit("change-task")};
</script>

<style lang="scss" scoped>
    @mixin button () {
        cursor: pointer;
        height: 50%;
        width: 80px;
        color: #2e9aff;
        border: 2px solid#2e9aff;
        background-color: white;
        font-size: 13px;
        font-family: "Source Sans Pro";
        font-weight: 400;
        border-radius: 5px;
        transition: 0.2s ease;
        overflow: hidden;
    }
    .button_change {
        @include button();

        &:hover {
            background-color: #2e9aff;
            border: 2px solid rgba(0, 0, 0, 0);
            color: white;
        }
    }
</style>