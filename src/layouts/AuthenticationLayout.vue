<style>
.bg-primary-webshop {
    background: linear-gradient(
        to right,
        #7953cd 20%,
        #00affa 30%,
        #0190cd 70%,
        #764ada 80%
    );
    background-size: 500% auto;
    animation: backgroundShine 1s ease-in-out infinite alternate;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
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
    <v-main class="d-flex align-center justify-center bg-primary-webshop">
        <v-card min-width="400" max-width="900">
            <router-view/>
        </v-card>
    </v-main>
</template>
