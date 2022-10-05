<template>
    <button
        class="button"
        :class="[props.className]"
        :style="{
            background: props.color,
            border: `1px solid ${props.color}`
        }"
        :disabled="disabled"
        @click="actionFunc"
    >
        {{ props.buttonName }}
    </button>
</template>
<script setup>
    const props = defineProps({
        buttonName: String,
        className: String,
        color: String,
        disabled: Boolean
    })


    const emits = defineEmits(["click", "hover"]);


    const actionFunc = () => {
        emits('click');
    }

</script>
<style lang="scss" scoped>
    @mixin button {
        width: 100%;
        height: 38px;
        color: aliceblue;
        border: none;
        font-family: "Source Sans Pro";
        font-weight: 400;
        font-size: 15px;
        border-radius: 5px;
        transition: 0.2s;
        overflow: hidden;
        user-select: none;
        &:hover {
            cursor: pointer;
        }
    }

    .button {
       @include button;
       &_cancel:hover {
            background: #c50b0b !important;
            border: 1px solid #c50b0b;
       }
    }
</style>