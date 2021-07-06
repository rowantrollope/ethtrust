<!--
    Create Wizard - Fund the trust
--> 
<template>
    <div class="bg-white border-2 overflow-y-auto rounded-b-lg">
        <div class="px-4 py-5 sm:px-6 flex items-center space-x-5">
            <h3 class="text-2xl font-medium leading-6 text-gray-900">
                <slot></slot>
            </h3>
        </div>
        <div class=" border-gray-200 text-lg px-4 py-5">
            <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-4 py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="input-label">
                        Ether amount
                    </dt>
                    <dd class=" text-gray-900 sm:col-span-2">
                        <EthInput class="-mt-5" :balance="bc.etherBalance" v-model="etherAmount">
                        </EthInput>
                    </dd>
                </div>
                <div class="input-description"> 
                    (Required)
                    Enter the amount of ETH you would like to place into this trust fund.
                    When you create the fund, you will be prompted by your wallet to approve the tranfer of funds.
                    As the creator of the trust, you will no longer have access to these funds.
                    You can add more ETH to this fund at any time in the future.
                </div>
            </dl>
        </div>
    </div>
</template>

<script setup="props, {emit}">
import { ref, defineProps, onUpdated } from 'vue';

import EthInput from './EthInput';
import { toWei } from '../services/helpers'
import bc from '../services/Blockchain';

const etherAmount = ref('1');

const props = defineProps({
    trust: Object,
});

const updated = onUpdated(() => {
    props.trust.etherAmount = toWei(etherAmount.value)
})
</script>

<style scoped>
.input-field {
    @apply md:flex-1 text-lg -mt-2 -ml-3 block border-none w-full min-w-0 focus:ring-indigo-500 ;
}
.input-label {
    @apply font-medium text-gray-900;
}
.input-description {
    @apply ml-10 mb-5 text-base text-gray-400 border-none;
}
</style>
