<!--
    Create New Trust Wizard
--> 
<template>
    <nav aria-label="Progress">
        <ol class="border bg-white border-gray-300 mt-2 rounded-t divide-y divide-gray-300 md:flex md:divide-y-0">
        <li v-for="(panel, idx) in panels" :key="panel" class="relative md:flex-1 md:flex">
            <!-- COMPLETED ITEM, CURRENT ITEM, NEXT ITEM --> 
            <transition mode="out-in" name="pop">
                <div v-if="idx === currentPanel" class="px-4 py-4 flex items-center" aria-current="step">
                    <span class="border-indigo-600 flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 rounded-full">                    
                        <span v-if="idx===currentPanel" class="text-indigo-600 font-xl font-black">{{ idx+1 }}</span>
                    </span>
                    <span class="text-indigo-600 ml-2 whitespace-nowrap font-medium ">{{ panel }}</span>
                </div>
            </transition>
            <div v-if="idx < currentPanel" class="px-4 py-4 flex items-center w-full">
                <span class="opacity-50 flex items-center text font-medium">
                    <span class="border-green-600 flex-shrink-0 w-8 h-8 flex items-center justify-center border  rounded-full ">
                        <CheckIcon class="text-green-500 w-6 h-6 " aria-hidden="true" />
                    </span>
                    <span class="text-green-600 ml-2 whitespace-nowrap font-medium ">{{ panel }}</span>
                </span>
            </div>
            <div v-else-if="idx > currentPanel" class="px-4 py-4 flex items-center">
                <span class="opacity-50 flex items-center font-medium">
                    <span class="border-gray-300 flex-shrink-0 w-8 h-8 flex items-center justify-center border-2  rounded-full ">
                        <span class="text-gray-500">{{ idx+1 }}</span>
                    </span>
                    <span class="text-gray-500 ml-2 whitespace-nowrap font-medium ">{{ panel }}</span>
                </span>
            </div>

            <template v-if="(idx !== panels.length - 1)">
                <!-- Arrow separator for lg screens and up -->
                <div class="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
                    <svg class="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                        <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
                    </svg>
                </div>
            </template>
        </li>
        </ol>
    </nav>
</template>

<script setup="props, {emit}">
import { defineProps } from 'vue';
import { CheckIcon } from '@heroicons/vue/outline'

const props = defineProps({
    panels: Array,
    currentPanel: Number,
});

</script>

<style scoped>
    .pop-enter-active {
        @apply transition transform ease-in duration-700;
    }
    .pop-enter-from {
        @apply opacity-50 scale-125;
    }
    .pop-enter-to {
        @apply opacity-100 scale-100;
    }

</style>
