<template>
    <button
        class="button"
        :class="[props.className]"
        :style="{
            background: props.color,
            border: `1px solid ${props.color}`,
            width: `${props.width}%`
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
        disabled: Boolean,
        width: [String, Number]
    })

    const emits = defineEmits(["click", "hover"]);
    const actionFunc = () => {
        emits('click');
    }
</script>
<style lang="scss" scoped>
    @mixin button {
        width: 25%;
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
    }
    .button {
       @include button;
       &_cancel:hover {
            background: #c50b0b !important;
            border: 1px solid #c50b0b !important;
            cursor: pointer;
       }
       &_undoredo {
            &:hover:not(:disabled) {
                background: #767776 !important;
                border: 1px solid #767776 !important;
                cursor: pointer;
            }
        }
    }
</style>