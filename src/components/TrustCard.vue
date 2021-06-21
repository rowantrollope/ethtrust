<template>
    <div class="card">
        <div :class="[props.trust.beneficiary.toLowerCase() === store.state.mainAccount.toLowerCase() ? 'card-tag-beneficiary' : 'card-tag']">
            <div class="">
                <img alt="ETHTrust logo" width="50" height="40" src="../assets/Lock-Time-256.png">
            </div>
        </div>

        <div class="card-body">
            <div>
                <p class="card-header">
                    {{ trust.name }}
                </p>
                <span class="-ml-2 text-green-500 text-lg flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" preserveAspectRatio="xMidYMid" viewBox="-38.39985 -104.22675 332.7987 625.3605"><path fill="#343434" d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"/><path fill="#8C8C8C" d="M127.962 287.959V0L0 212.32z"/><path fill="#3C3C3B" d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"/><path fill="#8C8C8C" d="M0 236.585l127.962 180.32v-104.72z"/><path fill="#141414" d="M127.961 154.159v133.799l127.96-75.637z"/><path fill="#393939" d="M127.96 154.159L0 212.32l127.96 75.637z"/></svg>
                {{ toEther(props.trust.etherAmount) }} ETH - ${{ eth2usd }} USD</span>
                <p class="text-lg"> Matures on {{ toDate(props.trust.maturityDate) }}<br/><br/> </p>
                <p> Trust ID: <b>{{ shortenAddress(props.trust.key) }} </b> </p>
                <p> Beneficiary: <b>{{ shortenAddress(props.trust.beneficiary) }} </b> </p>
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
        rounded-2xl
        shadow-sm 
        border 
        border-gray-300 
        bg-white 
        hover:border-gray-800 
        focus-within:ring-2 
        focus-within:ring-offset-4 
        focus-within:ring-black 
    }
    .card-tag {
        @apply flex-shrink-0 
            flex 
            items-center 
            bg-gradient-to-b
            from-black
            via-black
            to-gray-700
            text-white 
            justify-center 
            w-20 
            h-full 
            rounded-l-2xl;
    }
    .card-tag-beneficiary {
        @apply flex-shrink-0 
            flex 
            items-center 
            bg-gradient-to-b
            from-black
            via-indigo-900
            to-indigo-900
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
