<!--
    Create Wizard Confirmation
--> 
<template>
    <div class="absolute overflow-y-auto">
        <div class="mt-4 px-4 sm:px-6 flex items-center space-x-5 ">
            <h3 class="text-2xl font-medium leading-6 text-gray-900">
                <slot></slot>
            </h3>
        </div>
        <div class="text-sm px-6 py-6">
            <TrustCardEx :trust="trust"></TrustCardEx>
            Beneficiary: <b>{{ trust.beneficiary }} </b><br/>
            Trustee: <b>{{ trust.trustee }} </b><br/>
            ETH Amount: <b>{{ toEther(trust.etherAmount) }}</b>
            <br/><br/>
            <div class="text-red-500 leading-tight">
                Reminder: Once you create this fund and transfer your money, 
                you will no longer have access until the trust fund maturity date
                releases the funds to your beneficiary.
            </div>
        </div>
    </div>
</template>

<script setup="props, {emit}">
import { ref, defineProps } from 'vue';
import Button from '@/components/Button';
import TrustCardEx from '@/components/TrustCardEx';
import { toEther } from '@/services/Helpers';

const props = defineProps({
    trust: Object,
});

</script>

<style scoped>
</style>
