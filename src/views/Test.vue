<template>
    <div class="text-6xl font-black leading-tight ml-5 mr-5 mt-5">
        Your trust funds: <br/>
        <div class="flex mt-10">
            <div class="bg-green-100 shadow-lg p-6 border flex-grow">
                <div class="text-lg text-center">Trust Identification: 0x03r9185010583018501580135801580158 </div>
                <div class="inline-flex space-x-5 items-center">
                <img class="flex-inline" alt="ETHTrust logo" width="100" height="100" src="../assets/approved.png">                
                <div class="font-serif mt-10">
                    Certificate of Trust
                </div>  

                </div>
                <div class="mt-10 text-lg font-serif text-center">
                    <p>This certificate of trust is created in the name of Penelope Trollope - hereafter the beneficiary, account number: </p><br/>
                    <p>0x0394439384719a92849a84819a9481249a83.</p> <br/>
                    <p>In the amount of 15 ETH or $250,000 USD </p><br/><br/>
                    <p>This trust will mature on June 11, 2020, at which time the beneficiary or her trustee may directly access these funds pursuant to the rules set forth in the trust itself.</p>

                </div>
            </div>
        </div>
        <div class="relative flex w-full flex-wrap items-center items-stretch mb-3">
        <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-xl items-center justify-center w-8 pl-3 py-3">
            <svg class="-mt-2 -ml-3" xmlns="http://www.w3.org/2000/svg" height="40" width="40" preserveAspectRatio="xMidYMid" viewBox="-38.39985 -104.22675 332.7987 625.3605"><path fill="#343434" d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"/><path fill="#8C8C8C" d="M127.962 287.959V0L0 212.32z"/><path fill="#3C3C3B" d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"/><path fill="#8C8C8C" d="M0 236.585l127.962 180.32v-104.72z"/><path fill="#141414" d="M127.961 154.159v133.799l127.96-75.637z"/><path fill="#393939" d="M127.96 154.159L0 212.32l127.96 75.637z"/></svg>
        </span>
        <input type="number" placeholder="Enter ETH Amount" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-xl border-0 shadow outline-none focus:outline-none focus:ring w-full pl-10"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import store from '../store'
import Button from '../components/Button';

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
