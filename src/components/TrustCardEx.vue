<template>
    <div class="card justify-center">
        <div class="card-inner">
            <img alt="cert" width="400" src="../assets/money.png">
            <div class="cert-name text-2xl leading-tight">{{ trust.name }}</div>            
            <div class="cert-eth text-3xl text-white font-bold ">{{ toEther(props.trust.etherAmount) }}</div>
            <div class="cert-date text-xl">Available: {{ toDate(props.trust.maturityDate) }}</div>              
            <div class="cert-creator text-xs">{{ shortenAddress(props.trust.creator) }}3</div>            
            <div class="cert-trustee text-xs">{{ shortenAddress(props.trust.key) }} </div>            
        </div>
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

</script>

<style scoped>
     .card {
        @apply relative 
        py-0 
        flex 
        items-center 
        text-center
        bg-white 
    }
     .card-inner {
        @apply relative 
        flex 
        border-2
        border-gray-300
        py-2
        px-2
        shadow-md
        hover:border-black
        focus-within:ring-2 
        focus-within:ring-offset-4 
        focus-within:ring-green-800 
    }
    .cert-name {
            position: absolute;
            top: 35%;
            left: 50%;
            transform: translate(-50%, -50%);
    }
    .cert-eth {
            position: absolute;
            top: 69%;
            left: 50%;
            transform: translate(-50%, -50%);
    }
    .cert-creator {
            position: absolute;
            top: 75%;
            left: 23%;
            transform: translate(-50%, -50%);
    }
    .cert-trustee {
            position: absolute;
            top: 75%;
            left: 77%;
            transform: translate(-50%, -50%);
    }
    .cert-date {
            position: absolute;
            top: 48%;
            left: 50%;
            transform: translate(-50%, -50%);
    }

</style>
