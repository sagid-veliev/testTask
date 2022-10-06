<template>
    <button
        class="button"
        :class="[props.className]"
        :style="{
            background: props.color,
            border: `1px solid ${props.color}`,
            'min-width' : `${props.width}%`
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
    .button {
        background: #0398dd;
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
        opacity: 0.85;
        &:hover {
            opacity: 1;
            cursor: pointer;
        }
        &:disabled {
            opacity: 0.4;
            cursor: auto;
        }
    }
    
</style>