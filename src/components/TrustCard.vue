<template>
    <div class="card">
        <div class="relative text-center">
            <img alt="cert" width="250" height="200" src="../assets/money.png">
            <div class="cert-name text-lg font-light leading-tight">
                {{ trust.name }}
            </div>            
            <div class="cert-eth text-xl text-white font-bold ">
                {{ toEther(props.trust.etherAmount) }}
            </div>    
        </div>

        <div class="card-body">
            <div>

                <span class="eth-amount"> 
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" preserveAspectRatio="xMidYMid" viewBox="-38.39985 -104.22675 332.7987 625.3605"><path fill="#343434" d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"/><path fill="#8C8C8C" d="M127.962 287.959V0L0 212.32z"/><path fill="#3C3C3B" d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"/><path fill="#8C8C8C" d="M0 236.585l127.962 180.32v-104.72z"/><path fill="#141414" d="M127.961 154.159v133.799l127.96-75.637z"/><path fill="#393939" d="M127.96 154.159L0 212.32l127.96 75.637z"/></svg>
                    {{ toEther(props.trust.etherAmount) }} ETH 
                    <span class="text-gray-400">
                        &nbsp;(${{ eth2usd }} USD)
                    </span>
                </span>
                <p class="text-lg">Available on: {{ toDate(props.trust.maturityDate) }}<br/><br/> </p>
                <div class="flex space-x-4 ">
                <p> Trust ID: {{ shortenAddress(props.trust.key) }} </p>
                <p> Beneficiary: {{ shortenAddress(props.trust.beneficiary) }} </p>
                </div>
            </div>
        </div>
        <ChevronRightIcon class="h-8 w-8 text-gray-300" aria-hidden="true" />
    </div>
</template>

<script setup="props, {emit}">

import { defineProps, computed } from 'vue'
import { ref } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/outline'
import store from '../store';
import { round, shortenAddress, toDate, toEther } from '../helpers'

const props = defineProps({
    trust: Object,
});
const emit = defineEmit(['onclick']);
const eth2usd = computed(() => round(store.state.trustSvc.ETH2USD(props.trust.etherAmount)));

</script>

<style scoped>
    .card {
        @apply relative 
        py-0 
        flex 
        space-x-3 
        items-center 
        rounded-r-2xl
        shadow-md 
        border-2
        border-gray-300 
        bg-white 
        hover:border-black
    }
    .eth-amount {
        @apply -ml-2 text-black text-lg flex items-center;
    }
    .cert-name {
            position: absolute;
            top: 38%;
            left: 50%;
            transform: translate(-50%, -50%);
    }
    .cert-eth {
            position: absolute;
            top: 70%;
            left: 50%;
            transform: translate(-50%, -50%);
    }
    .cert-nbr {
            position: absolute;
            top: 96%;
            left: 50%;
            transform: translate(-50%, -50%);
    }

    .card-tag-beneficiary {
        @apply flex-shrink-0 
            flex 
            items-center 
            bg-gradient-to-b
            from-black
            via-green-900
            to-green-900
            text-white 
            justify-center 
            w-20 
            h-full 
            rounded-l-2xl;
    }
    .card-icon {
        @apply inline text-gray-400 h-10 w-10;
    }
    .card-header {
        @apply text-xl mb-2 font-light text-black;
    }
    .card-body {
        @apply text-black text-sm flex-1 min-w-0 mt-2 mb-2
    }
</style>
