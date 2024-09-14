<style>
.bg-primary-webshop-header {
    background: linear-gradient(
        340deg,
        #7953cd 20%,
        #00affa 30%,
        #0190cd 70%,
        #764ada 80%
    );
    background-size: 500% auto;
    animation: backgroundShine 15s ease-in-out infinite alternate;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

.nav-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bg-primary-webshop {
    background: linear-gradient(
        340deg,
        #7953cd44 20%,
        #00affa44 30%,
        #0190cd44 70%,
        #764ada44 80%
    );
    background-size: 500% auto;
    animation: backgroundShine 15s ease-in-out infinite alternate;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

.logo{
    color:white;
    text-decoration: none;
    text-underline: none;
}

@keyframes backgroundShine {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 100% 50%;
    }
}

</style>
<template>
    <v-app-bar color="primary" style="width: 100vw">
        <div class="bg-primary-webshop-header">
            <RouterLink
                style="text-decoration: none; color: inherit;" :to="`/`">
                <h1 class="logo">Webshop</h1>
            </RouterLink>
            <nav class="nav-buttons">
                <v-btn to="/basket" v-if="authStore.isUser">Warenkorb</v-btn>
                <v-btn to="/new-product" v-if="authStore.isAdmin">Produkt anlegen</v-btn>
                <template v-if="authStore.isLoggedIn">
                    <v-btn @click="authStore.logout">Logout</v-btn>
                </template>
                <template v-else>
                    <v-btn to="/login">Login</v-btn>
                    <v-btn to="/register">Registrieren</v-btn>
                </template>
            </nav>
        </div>
    </v-app-bar>
    <v-main class="bg-primary-webshop">
        <v-container>
            <router-view/>
        </v-container>
    </v-main>
</template>

<script setup>
import {useAuthStore} from '@/store/authStore'

const authStore = useAuthStore()
</script>
