<template>
    <button 
        v-show="props.showButton || props.page !== 'change'" 
        @click="redirect" 
        class="button"
    >{{ props.buttonName }}</button>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const props = defineProps({
        showButton: {
            type: Boolean,
            default: false
        },
        buttonName: {
            type: String,
            default: "Перейти к изменениям"
        },
        page: {
            type: String,
            default: "change"
        }
    })

    const redirect = () => {
        router.push({
            name: props.page,
        });
    }

</script>

<style lang="scss" scoped>
    .button {
        height: 38px;
        width: 25%;
        color: rgb(74, 180, 75);
        border: none;
        border: 1px solid rgb(74, 180, 75);
        background-color: white;
        font-family: "Source Sans Pro";
        font-weight: 400;
        font-size: 15px;
        border-radius: 5px;
        transition: 0.2s;
        overflow: hidden;
        user-select: none;
        &:hover {
            background-color: rgb(74, 180, 75);
            border: 1px solid rgba(0, 0, 0, 0);
            color: white;
            cursor: pointer;
        }
    }
</style>