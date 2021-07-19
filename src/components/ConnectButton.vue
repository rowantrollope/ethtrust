<!--
    Handles the "Connected" button to display the state of the connection to the blockchain / metamask
    
    Currently handles three states: Connect, Connected and Error.
    
    TODO: Add animation for transitions.    
-->
<template>
    <Popover class="relative">
        <PopoverButton v-if="bc.state.isConnected && ts.state.isConnected" class="h-7 popover-button" @click="onClicked()">
            <jazzicon class="-ml-1 mt-1" :address="bc.state.mainAccount" :diameter="24"/>
            <span class="status-text">Connected</span>
            <ChevronDownIcon class="text-black -ml-1 h-6 w-6" aria-hidden="true" />
        </PopoverButton>
        <PopoverButton v-else-if="bc.state.connectionError" class="popover-button-warning" @click="onClicked()">
            <StatusOnlineIcon class="status-icon-warning" aria-hidden="true" />
            <span class="status-text">Not Connected </span>
        </PopoverButton>
        <PopoverButton v-else-if="!bc.state.isConnected" class="popover-button-connect" v-on:click.prevent="onClicked()">
            <StatusOnlineIcon class="status-icon-connect" aria-hidden="true" />
            <span class="status-text-connect">Start</span>
        </PopoverButton>

        <transition name="fadeslide">
            <PopoverPanel v-if="bc.state.isConnected" class="popover-panel">
                <div class="flex-col text-left vertical space-y-3">
                    <div class="flex items-center space-y-3 text-xl ">
                        <ShieldCheckIcon class="h-8 w-8 text-green-500"/> &nbsp;Blockchain Connected
                    </div>
                    <div class="flex">
                        Account: <b> &nbsp;{{ bc.state.mainAccount }} </b>
                    </div>
                    <div class="flex">
                        Balance: <b> &nbsp;{{ $filters.round($filters.toEther(bc.state.balance)) }} ETH - ( {{ exchange.eth2usdFormatted($filters.toEther(bc.state.balance)) }} ) </b>
                    </div>
                </div>
            </PopoverPanel>
            <PopoverPanel v-else-if="ts.connectionError" class="popover-panel">
                <div class="flex-col vertical space-y-5">
                    <p class="flex text-xl border text-red-500 border-red-500 p-2 rounded-md ">
                        Failed to connect to the Blockchain
                    </p>
                    <p>
                        Error Message: {{ ts.connectionErrorMessage }}
                    </p>
                    <p class="flex">
                        Account: &nbsp; <b> {{ bc.state.mainAccount }} } </b>
                    </p>
                    <div class="text-right">
                    <Button class="btn-primary" @click="onClicked()">Try Again</Button>
                    </div>
                </div>
            </PopoverPanel>
        </transition>
    </Popover>
</template>

<script setup>
import { inject } from 'vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { StatusOnlineIcon, MenuIcon, ShieldCheckIcon } from '@heroicons/vue/outline';
import { ChevronDownIcon } from '@heroicons/vue/solid';
import Jazzicon from 'vue-jazzicon/src/components';

import Button from '@/components/Button.vue';
import bc from '@/services/Blockchain';
import ts from '@/services/TrustContract';

const exchange = inject('exchange');

const onClicked = () => {

    if(!bc.state.isConnected) {
        bc.connect().then(() => {
            ts.init();
        });
    }

}

</script>

<style scoped>
    .popover-button {
        @apply bg-white px-2 items-center flex text-sm font-medium rounded-full hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white;
    }
    .popover-button-connect {
        @apply bg-blue-500 px-2 items-center flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:bg-indigo-300 focus:ring-white;
    }
    .popover-button-warning {
        @apply bg-red-500 px-2 items-center flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:bg-red-200 focus:ring-white;
    }
    .popover-panel {
        @apply origin-top-right absolute px-5 pt-5 pb-5 right-0 mt-2 rounded-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50;
    }
    .status-icon {
        @apply text-green-400 h-8 w-8;
    }
    .status-icon-connect {
        @apply text-white h-8 w-8;
    }
    .status-icon-warning {
        @apply text-white h-8 w-8;
    }
    .status-text-connect {
        @apply text-white text-lg ml-1 mr-2 ;
    }
    .status-text-warning {
        @apply text-white text-lg ml-1 mr-2 ;
    }
    .status-text {
        @apply text-black focus:text-white text-xs font-normal ml-2 mr-2 ;
    }
    .fadeslide-enter-active {
        @apply transition transform ease-out duration-300;
    }
    .fadeslide-enter-from {
        @apply  opacity-0 scale-0;
    }
    .fadeslide-enter-to {
        @apply  opacity-100 scale-100 ;
    }
    .fadeslide-leave-active {
        @apply transition ease-in duration-100;
    }
    .fadeslide-leave-from {
        @apply transform scale-100 opacity-100;
    }
    .fadeslide-leave-to {
        @apply transform opacity-0 scale-0;
    }
</style>
