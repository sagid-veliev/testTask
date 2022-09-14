<template>
    <div class="todo_item">
        <div class="content">
            <input type="checkbox" class="content_checkbox" name="task" id="task" disabled checked/>
            <label class="content_task" for="task">Все нармална, я в  ты такой,  вырубить и ты ничего мне не сделаешь</label>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

    $color: #f88112;
    .todo_item {
        display: flex;
        justify-content: center;
        background-color: #FFFEFB;
        height: 100px;
        width: 50%;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }

    .content {
        display: flex;
        align-items: center;
        width: 90%;
        &_checkbox {
            z-index: -1;
            opacity: 0;
        }
        &_checkbox+label {
            display: inline-flex;
            align-items: center;
            user-select: none;
            cursor: pointer;
        }
        &_checkbox+label::before {
            content: '';
            display: inline-flex;
            width: 20px;
            height: 20px;
            border: 1px solid #adb5bd;
            border-radius: 25%;
            margin-right: 20px;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 50% 50%;
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
            background-color:  $color;
            opacity: 0.5;
            cursor: default;
        }
        &_task {
            font-family: "Source Sans Pro";
            font-weight: 600;
            font-size: 20px;
            line-height: 20px;
        }
    }
</style>