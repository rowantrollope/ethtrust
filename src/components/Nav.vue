<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <Disclosure as="nav" class="bg-gray-900" v-slot="{ open }">
        <div class="mx-auto pl-2 pr-3">
            <div class="flex justify-between h-16">
                <div class="flex">
                    <div class="-ml-2 mr-2 flex items-center md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span class="sr-only">Open main menu</span>
                            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                    <div class="brand-item">
                       <svg class="rotating-always" xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="-107.3421 -298.5 930.2982 1791"><g fill-rule="evenodd" fill="none"><path fill="#5A9DED" d="M357.2 901.161l358.414-224.965L357.2 1194zm53.295 29.281v93.57L525.27 858.259z"/><path fill="#D895D3" d="M393.88 433.792L658.468 583.49l-26.098 46.129-264.588-149.697z"/><path fill="#FF9C92" d="M357.2 0l357.2 614.809-357.2 225.29zm52.675 196.753v547.82l233.291-147.14z"/><path fill="#53D3E0" d="M358.414 901.161L0 676.196 358.414 1194zm-53.295 29.281v93.57L190.345 858.259z"/><path fill="#A6E275" d="M310.588 438.79L46 588.487l26.1 46.129 264.588-149.697z"/><path fill="#FFE94D" d="M357.2 0L0 614.809l357.2 225.29zm-52.675 196.753v547.82L71.234 597.434z"/></g></svg>
                            <!-- <CashIcon class="inline h-9 w-9 p-1"/> -->
                        <div class="brand-text">
                            Trusted.eth
                        </div>
                    </div>
                    <div class="md:flex hidden items-center">
                        <router-link class="router-link" tag="li" to="/">
                            Home
                        </router-link>
                        <router-link class="router-link" tag="li" to="/ForYou">
                             Trusts for you
                        </router-link>
                        <router-link class="router-link" tag="li" to="/Trusts">
                            Manage Trusts
                        </router-link>
                        <router-link class="router-link" tag="li" to="/About">
                            About
                        </router-link>
                        <router-link class="router-link" tag="li" to="/Test">
                            Test
                        </router-link>
                    </div>
                </div>
                <div class="flex items-center">
                    <ConnectButton/>
                </div>
            </div>
        </div>

        <DisclosurePanel class="md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <router-link class="mobile-router-link" tag="li" to="/">
                    Home
                </router-link>
                <router-link class="mobile-router-link" tag="li" to="/ForYou">
                        Trusts for you
                </router-link>
                <router-link class="mobile-router-link" tag="li" to="/Trusts">
                    Manage Trusts
                </router-link>
                <router-link class="mobile-router-link" tag="li" to="/About">
                    About
                </router-link>
                <router-link class="mobile-router-link" tag="li" to="/Test">
                    Test
                </router-link>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, TransitionRoot } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import ConnectButton from './ConnectButton.vue'

</script>

<style scoped>
    .navi {
        @apply bg-black text-white;
    }
    .brand-text {
        @apply mt-1 text-2xl text-gray-100 tracking-tight subpixel-antialiased;
    }
    .nav-items {
        @apply hidden md:ml-6 md:flex md:items-center md:space-x-4;
    }
    .router-link-active {
        @apply border bg-black text-white px-3 py-2 rounded-md text-lg font-light;
    }
    .router-link {
        @apply flex-shrink-0 text-gray-300 hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-light sm:text-lg;
    }
    .mobile-router-link {
        @apply text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium;
    }
    .mobile-router-link-active {
        @apply bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium;
    }
    .brand-item {
        @apply flex-shrink-0 flex items-center mr-5;
    }
    .rotating {
        transition: transform 1s ease-in-out;
    }
    .rotating:hover {
        transform: rotateZ(360deg);
    }
    @keyframes rotating {
        from
            {
            transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            }
        to
            {
            transform: rotate(360deg);
            -o-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            }
    }
    @-webkit-keyframes rotating {
        from
            {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            }
        to
            {
            transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            }
    }
    .rotating-always {
        -webkit-animation: rotating 10s linear infinite;
        -moz-animation: rotating 10s linear infinite;
        -ms-animation: rotating 10s linear infinite;
        -o-animation: rotating 10s linear infinite;
        animation: rotating 10s linear infinite;
    }
</style>
