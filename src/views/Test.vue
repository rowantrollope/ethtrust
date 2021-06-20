<template>
    <div class="mx-5 mt-5">
        <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center">
                <span class="px-3 bg-white text-lg font-medium text-gray-900">
                    {{ shortenAddress('0x00f03040100105010505010505') }}
                </span>
            </div>
        </div>
        
        <p> Exchange Rate (ETH-USD) {{ exchange.USD }} </p>
        <p> Exchange Rate (ETH-BTC) {{ exchange.BTC }} </p>
        <p> Exchange Rate (ETH-EUR) {{ exchange.EUR }} </p>


        <div class="flex flex-col mt-10">
            <div class="flex items-center space-x-2">                    
                <div class="text-md w-20">
                    Asset: 
                </div>
                <div class="border flex p-2 w-52 space-x-2 items-center">
                    <div class="border rounded-full content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" preserveAspectRatio="xMidYMid" viewBox="-38.39985 -104.22675 332.7987 625.3605"><path fill="#343434" d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"/><path fill="#8C8C8C" d="M127.962 287.959V0L0 212.32z"/><path fill="#3C3C3B" d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"/><path fill="#8C8C8C" d="M0 236.585l127.962 180.32v-104.72z"/><path fill="#141414" d="M127.961 154.159v133.799l127.96-75.637z"/><path fill="#393939" d="M127.96 154.159L0 212.32l127.96 75.637z"/></svg>
                    </div>
                    <div class="">
                        ETH<br/>
                        <div class="-mt-1 text-xs">Balance: 120.335810 ETH </div> 
                    </div>
                </div>
            </div>
            <div class="flex items-center space-x-2 space-y-2 ">                    
                <div class="text-md w-20">
                    Amount: 
                </div>
                <div class="border flex-col p-2 w-52 space-x-2 items-center">
                    <input class="w-28" type="number" v-model.number="eth"/> ETH
                </div>
                    <span class="text-right text-sm"> ${{ eth2usd }} USD</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import store from '../store'
import { shortenAddress } from '../helpers'

const eth = ref(0);
const exchange = ref(Object);
const eth2usd = computed(() => eth.value * exchange.value.USD);

const init = async () => {
    const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC,EUR");
    const data = await response.json();
    console.log("Rates: ", data);
    exchange.value = data;    
}

init();

</script>