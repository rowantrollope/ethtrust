<template>
<!--    <div class="flex flex-col text-lg">
    <div class="flex hidden items-center space-x-2">                    
        <div class="text-md w-20">
            Balance: 
        </div>
        <div class="flex p-2 w-full space-x-2 items-center">
            <div class="content-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" preserveAspectRatio="xMidYMid" viewBox="-38.39985 -104.22675 332.7987 625.3605"><path fill="#343434" d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"/><path fill="#8C8C8C" d="M127.962 287.959V0L0 212.32z"/><path fill="#3C3C3B" d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"/><path fill="#8C8C8C" d="M0 236.585l127.962 180.32v-104.72z"/><path fill="#141414" d="M127.961 154.159v133.799l127.96-75.637z"/><path fill="#393939" d="M127.96 154.159L0 212.32l127.96 75.637z"/></svg>
            </div>
            <div class="">
                <div class="">{{ round(props.balance) }} ETH </div> 
            </div>
        </div>
    </div>
-->
    <div class="flex items-center space-x-2">                    
        <div class="text-md">
            <slot></slot>
        </div>
        <div class="flex-col p-2 space-x-2 items-center">
            <div class="flex">
                <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <svg class="-ml-2" xmlns="http://www.w3.org/2000/svg" height="24" width="24" preserveAspectRatio="xMidYMid" viewBox="-38.39985 -104.22675 332.7987 625.3605"><path fill="#343434" d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"/><path fill="#8C8C8C" d="M127.962 287.959V0L0 212.32z"/><path fill="#3C3C3B" d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"/><path fill="#8C8C8C" d="M0 236.585l127.962 180.32v-104.72z"/><path fill="#141414" d="M127.961 154.159v133.799l127.96-75.637z"/><path fill="#393939" d="M127.96 154.159L0 212.32l127.96 75.637z"/></svg>
                    ETH
                </span>
                <input class="flex-1 w-24 block focus:ring-indigo-500 focus:border-indigo-500 rounded-none rounded-r-md border-gray-300" 
                    type="number" 
                    autocomplete="ethvalue" 
                    :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"/>
            </div>
        </div>
        <span class="text-right"> ${{ eth2usd }} USD</span>
    </div>


</template>

<script setup="props, {emit}">

import { ref, computed, onMounted } from 'vue';
import { round } from '../helpers';

const eth = ref(0);
const exchange = ref(Object);
const eth2usd = computed(() => round(props.modelValue * exchange.value.USD));

const props = defineProps({
    modelValue: Number,
    balance: Number,
});

const mounted = onMounted(async () => {
    const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC,EUR");
    const data = await response.json();
    exchange.value = data;    
});

</script>
