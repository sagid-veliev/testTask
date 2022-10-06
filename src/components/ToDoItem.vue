<template>
    <div class="todo_item">
        <div class="container">
            <input 
                :checked="checked"
                type="checkbox"
                class="container_checkbox" 
                name="task" 
                :id="props.id"
                :disabled="props.disabled"
                @change="toggleInput"
            />
            <label class="container_task" :for="props.id">{{ props.task }}</label>
            <slot name="change_btn"></slot>
            <slot name="delete_btn"></slot>            
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    task: {
        type: String,
        default: "",
    }, 
    id: {
        type: Number,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: true
    },
    checked: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["check"]);
const toggleInput = () => { emit("check") };

</script>

<style lang="scss" scoped>

.cart-enter-active,
.cart-leave-active {
    transition: all .7s;
}
.cart-enter {
    transform: translateX(33%);
    opacity: 0;
}
.cart-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
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
        gap: 10px;
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
            content: "";
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
            opacity: 0.4;
            cursor: default;
        }
        &_task {
            width: 90%;
            font-family: "Source Sans Pro";
            font-weight: 600;
            font-size: 18px;
            line-height: 18px;
            height: 100%;
            word-break: break-all;
            gap: 10px;
        }
    }

    @media (max-width: 1100px) {
        .todo_list {
            width: 80%;
        }
    }
    @media (max-width: 600px) {
        .container {
            flex-direction: column;
        }
        .todo_list {
            display: flex;
            flex-direction: column;
            width: 80%;
        }
    }
</style>