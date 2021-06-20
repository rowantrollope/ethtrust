<template>
    <div class="mx-5 mt-5">
        <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center">
                <span class="px-3 bg-white text-lg font-medium text-gray-900">
                    {{ shortenAddress('0x00f03040100105010505010505') }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from '../store'
import { shortenAddress } from '../helpers'

</script>