<template>
    <div class="todo_list">
        <div class="todo_list_header">
            {{ props.header }}
        </div>
        <div class="todo_list_form">
            <slot name="form"></slot>
        </div>
        <div class="todo_list_items">
            <slot name="items"></slot>
        </div>
        <div class="todo_list_change">
            <slot name="button"></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["header"])

</script>

<style lang="scss" scoped>
   
    .todo_list {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 60%;
        border-radius: 10px;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        gap: 15px;
        letter-spacing: 0.7px;
        margin: 15px;
        &_header {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-weight: 600;
            font-size: 26px;
            font-family: "Source Sans Pro";
            border-radius: 10px 10px 0 0;
            background-color: #FFFEFB;
        }
        &_form {
            width: 90%;
        }
        &_items {
            width: 90%;
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 10px;
        }
        &_change {
            display: flex;
            justify-content: space-between;
            width: 90%;
            margin-bottom: 15px;
            height: auto;
        }
    }

    @media (max-width: 1100px) {
        .todo_list {
            width: 80%;
        }
    }
    @media (max-width: 800px) {
        .todo_list {
            display: flex;
            flex-direction: column;
            width: 80%;
        }
    }
</style>