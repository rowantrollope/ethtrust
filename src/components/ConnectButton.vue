<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <!-- Profile dropdown -->
    <Menu as="div" class="menu">
        <div>
            <MenuButton class="menu-button">
                <span class="sr-only">Connected</span>
                <StatusOnlineIcon class="status-icon" aria-hidden="true" />
            <span class="status-text">Connected</span>
            </MenuButton>
        </div>
        <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="menu-items">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <div class="menu-item">{{ item.name }}</div>
                </MenuItem>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { StatusOnlineIcon, MenuIcon } from '@heroicons/vue/outline'
import Button from './Button.vue';
im
const userNavigation = [
    { name: 'Blockchain Connected', href: '#' },
    { name: 'Account: 0x0f0d4912340981250190981253400f0', href: '#' },
    { name: 'Balance: 20 ETH', href: '#' },
]

const props = defineProps({
    msg: String,
})

const init = async () => {
}

init();

</script>

<style scoped>
    .menu {
        @apply ml-3 relative;
    }
    .menu-button {
        @apply bg-white px-2 inline-block items-center flex text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white;
    }
    .menu-items {
        @apply origin-top-right absolute right-0 mt-2 rounded-2xl shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50;
    }
    .menu-item {
        @apply block px-4 py-2 text-gray-900;
    }
    .status-icon {
        @apply text-green-400 h-8 w-8;
    }
    .status-text {
        @apply text-black ml-1 mr-2 font-light;
    }
</style>
