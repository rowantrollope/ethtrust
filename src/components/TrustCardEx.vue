<!--
    Card display for a single trust, shown by the ForYou list.
--> 
<template>
    <div :class="selectable ? card-selectable : ''" class="card justify-center cursor-pointer">
        <div class="card-inner">
            <img alt="cert" width="400" src="../assets/money.png">
            <div class="cert-name text-2xl leading-tight">{{ trust.name }}</div>            
            <div class="cert-eth text-3xl text-white font-bold ">{{ $filters.toEther(props.trust.etherAmount) }}</div>
            <div class="cert-date text-xl">Available: {{ $filters.toDate(props.trust.maturityDate) }}</div>              
            <div class="cert-creator text-xs">{{ $filters.shortenAddress(props.trust.creator) }}3</div>            
            <div class="cert-trustee text-xs">{{ $filters.shortenAddress(props.trust.trustee ) }} </div>            
        </div>
    </div>
</template>

<script setup="props, {emit}">
import { defineEmit, defineProps } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/outline'

const props = defineProps({
    trust: Object,
    selectable: Boolean,
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
    .card-selectable {
        @apply border
        rounded-md
        border-gray-300
        bg-gray-100
        shadow-sm
        hover:border-black
        focus-within:ring-2 
        focus-within:ring-offset-4 
        focus-within:ring-green-800;
    }
     .card-inner {
        @apply relative 
        flex 
        py-2
        px-2
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
