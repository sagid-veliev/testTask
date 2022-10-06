<template>
    <div class="header">
        <div class="header_links">
            <router-link class="header_link" to="/">Главная</router-link>
            <span>|</span>
            <router-link class="header_link" to="/ChangePage">Редактирование</router-link>
        </div>
    </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
    .header {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        &_links {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
            gap: 25px;
            font-family: 'Source Sans Pro';
            color: #f88112;
            font-weight: 600;
        }
        &_link {
            cursor: pointer;
            text-decoration: none;
            color: #f88112;
            &:hover {
                color: #d57011;
            }
        }
    }
</style>