<template>
    <div @click="closeModal" v-show="props.showModal" class="popup_fade">
        <div class="popup">
            <div class="popup_header">Подтвердить действие</div>
            <div class="popup_content">Вы уверены, в своём решении?</div>
            <div class="popup_action">
                <button @click.stop="someConfirm" class="popup_action_confirm">Да</button>
            </div>
        </div>		
    </div>
</template>
<script setup>
    const props = defineProps({
        showModal: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['select', 'close']);
    const someConfirm = () => {
        emit('select');
    }
    const closeModal = () => {
        emit('close');
    }

    
</script>
<style lang="scss" scoped>
    .popup {
        position: fixed;
        top: 20%;
        left: 50%;
        width: 450px;
        height: 150px;
        margin-left: -225px;	
        background: #fff;
        font-family: "Source Sans Pro";
        border-radius: 4px; 
        z-index: 1000;
        opacity: 1;	
        &_fade:before {
            content: '';
            background: #000;
            position: fixed; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%;
            opacity: 0.7;
            z-index: 100;
        }
        &_header {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px 4px 0 0; 
            height: 20%;
            background-color: rgb(255, 244, 219);
        }
        &_content {
            display: flex;
            align-items: center;
            height: 40%;
            padding: 5px;
            font-size: 15px;
        }
        &_action {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 30%;
            padding: 0 5px;
            &_confirm {
                height: 80%;
                width: 15%;
                color: rgb(134, 192, 0);
                border: 1px solid rgb(134, 192, 0);
                background-color: white;
                font-size: 15px;
                border-radius: 5px;
                transition: 0.2s;
                overflow: hidden;
                user-select: none;
                &:hover:not(:disabled) {
                    background-color: rgb(134, 192, 0);
                    border: 1px solid rgba(0, 0, 0, 0);
                    color: white;
                    cursor: pointer;
                }
            }
        }
    }
    
</style>