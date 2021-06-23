<template>
    <div class="m-5">
        <div class="text-6xl font-black leading-tight ">
            Your trust funds: <br/>
        </div>
        <ToastNotification :open="toast.open">
            <template v-slot:title>{{toast.title}}</template>
            <template v-slot:message>{{toast.message}}</template>
        </ToastNotification>
        <Button class="btn btn-primary" @click="showNotification('Test', 'Test Message')">Show Notification</Button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import store from '../store'
import Button from '../components/Button';
import ToastNotification from '../components/Toast';

const toast = ref({
    title: '',
    message: '',
    open: false,
});

const showNotification = (title, message, timeout=3000) =>
{
    toast.value.title = title;
    toast.value.message = message;
    toast.value.open = true;
    setTimeout(() => { toast.value.open = false }, timeout);
}

</script>

<style scoped>
    .rotating {
        transition: transform 1s ease-in-out;
    }
    .rotating:hover {
        transform: rotateZ(360deg);
    }
    @keyframes rotating {
        from
            {
            transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            }
        to
            {
            transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            }
    }
    @-webkit-keyframes rotating {
        from
            {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            }
        to
            {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            }
    }
    .rotating-always {
        -webkit-animation: rotating 10s linear infinite;
        -moz-animation: rotating 10s linear infinite;
        -ms-animation: rotating 10s linear infinite;
        -o-animation: rotating 10s linear infinite;
        animation: rotating 10s linear infinite;
    }

</style>
