<template>
    <div class="text-6xl font-black leading-tight ml-5 mr-5 mt-4 mb-4">
        Your trust funds: <br/>
    </div>
    <div class="ml-5 mr-5 grid gap-2 grid-cols-2">
        <div class="bg-black text-right text-white">
            Item 1:
        </div>
        <div class="bg-black text-white">
            Information 1
        </div>
        <div class="bg-black text-right text-white">
            Item 1:
        </div>
        <div class="bg-black text-white">
            Information 1
        </div>
        <div class="bg-black text-right text-white">
            Item 1:
        </div>
        <div class="bg-black text-white">
            Information 1
        </div>
    </div>
    <div class="flex ml-5 mr-5 mt-5 space-x-2">
        <div class="text-right flex-shrink">
            <p>Information 1 </p>
            <p>item 2 </p>
            <p>This is 3 </p>

        </div>
        <div class="flex-grow">
            Information 1<br/>
            Information 1<br/>
            Information 1<br/>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import store from '../store'
import Button from '../components/Button';
import TestComponent from '../components/TestComponent';

const name = ref("You");

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
