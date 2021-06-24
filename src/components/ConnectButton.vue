<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <!-- Profile dropdown -->
    <Menu as="div" class="menu">
        <div>
            <MenuButton v-if="bc.state.isConnected && ts.state.isConnected" class="h-8 menu-button" @click="onClicked()">
                <blockies class="-ml-5 ring-4 ring-white rounded-full" :opts="{
                seed: bc.state.mainAccount, // seed used to generate icon data, default: random
                color: 'green', // to manually specify the icon color, default: random
                bgcolor: 'blue', // choose a different background color, default: random
                size: 8, // width/height of the icon in blocks, default: 8
                scale: 4, // width/height of each block in pixels, default: 4
                spotcolor: 'yellow' // each pixel has a 13% chance of being of a third color,
                }" />
                <!-- <StatusOnlineIcon<class="status-icon" aria-hidden="true" /> -->
                <span class="status-text">Connected</span>
                <ChevronDownIcon class="text-black -ml-1 h-6 w-6" aria-hidden="true" />
            </MenuButton>
            <MenuButton v-else-if="bc.state.connectionError" class="menu-button-warning" @click="onClicked()">
                <StatusOnlineIcon class="status-icon-warning" aria-hidden="true" />
                <span class="status-text">Not Connected </span>
            </MenuButton>
            <MenuButton v-else-if="!bc.state.isConnected" class="menu-button-connect" v-on:click.prevent="onClicked()">
                <StatusOnlineIcon class="status-icon-connect" aria-hidden="true" />
                <span class="status-text-connect">Start</span>
            </MenuButton>

        </div>
        <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems v-if="bc.state.isConnected" class="menu-items">
                <div class="flex-col vertical space-y-5">
                    <p class="flex text-xl border text-green-500 border-green-500 p-2 rounded-md ">
                        Successfully connected to the Blockchain
                    </p>
                    <p class="flex inline-block">
                        Account: &nbsp; <b> {{ bc.state.mainAccount }} </b>
                    </p>
                    <p class="flex">
                        Balance: &nbsp; <b> {{ bc.etherBalance.value }} ETH </b>
                    </p>
                <!--
                <div class="text-right">
                <Button class="btn btn-danger" @click="onDisconnect()">Disconnect from Blockchain</Button>
                </div>
                -->
                </div>
            </MenuItems>
            <MenuItems v-else-if="ts.connectionError" class="menu-items">
                <div class="flex-col vertical space-y-5">
                <p class="flex text-xl border text-red-500 border-red-500 p-2 rounded-md ">
                    Failed to connect to the Blockchain
                </p>
                <p>
                    Error Message: {{ ts.connectionErrorMessage }}
                </p>
                <p class="flex inline-block">
                    Account: &nbsp; <b> {{ bc.state.mainAccount }} </b>
                </p>
                <div class="text-right">
                <Button class="btn btn-primary" @click="onClicked()">Try Again</Button>
                </div>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { ref, onActivated, onMounted, onUpdated } from 'vue'
import blockies from './Identicon.vue'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { StatusOnlineIcon, MenuIcon } from '@heroicons/vue/outline';
import { ChevronDownIcon } from '@heroicons/vue/solid';
import Button from './Button.vue';
import bc from '../blockchain';
import ts from '../services/TrustContract';

const onClicked = () => {

    if(!bc.state.isConnected) {
        bc.connect().then(() => {
            ts.init();
        });
    }

}

</script>

<style scoped>
    .menu {
        @apply ml-3 relative;
    }
    .menu-button {
        @apply bg-white px-2 inline-block items-center flex text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white;
    }
    .menu-button-connect {
        @apply bg-blue-500 px-2 inline-block items-center flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white;
    }
    .menu-button-warning {
        @apply bg-red-500 px-2 inline-block items-center flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white;
    }
    .menu-items {
        @apply origin-top-right absolute px-5 pt-5 pb-5 right-0 mt-2 rounded-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50;
    }
    .menu-item {
        @apply px-4 py-2 text-gray-900;
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
        @apply text-black font-light ml-1 mr-2 ;
    }
</style>
