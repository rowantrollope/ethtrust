<!--
    Dialog used to edit a trust settings.

    Handles edit of editable settings, deposit, withdraw, delete.  All actions taken through caller
    upon emitted events.

    Caller passes in a temporary trust object which can be discarded on Cancel/Close

--> 
<template>
    <Modal :open="open" @cancel="onCancel">
        <div class="text-2xl font-bold border-gray-500 border-b-2">
            Trust Fund: {{ trust.name }}
        </div>
        <div v-if="ready" class="text-xl mt-5">
            CONGRATULATIONS! Your trust fund is now available.<br/><br/>
        </div>
        <div v-else-if="!ready" class="text-xl mt-5">
            This trust fund will be accessible on <span class="text-red-500"> {{ $filters.toDate(trust.maturityDate) }} </span>
            at which time you may withdraw the full value of the fund into your account. <br/><br/>
        </div>
        <div class="text-xl">

        This trust was created on <span class="text-red-500"> {{ $filters.toDate(trust.createdDate) }} </span> 
        by the account # <span class="text-red-500"> {{ $filters.shortenAddress(trust.creator) }} </span><br/><br/>
    
        The fund contains <span class="text-red-500"> {{ $filters.toEther(trust.etherAmount) }} </span> Ethereum (ETH). 
        Worth approximately {{ eth2usd }} .<br/><br/>
        </div>
        <!--
            WITHDRAW FUNDS TAB
        -->
        <div v-if="ready" class="border rounded-md px-5 mt-5 text-xl">
            <p class="text-2xl mt-5 ">Withdraw funds from trust-fund:</p><br/>

            <p>Maximum withdrawal: 
                <span class="text-green-500">{{$filters.toEther(trust.etherAmount)}} ETH</span>
            </p>
            <div class="grid grid-cols-12 mt-4 gap-6 items-center">
                <div class="col-span-12">
                    <EthInput v-model="ethWithdraw">Enter Amount to withdraw</EthInput>
                </div>
            </div>
        </div>

            <div class="flex mt-5 ">
                <Button class="flex-1 btn-white mx-2" :onClick="onCancel" >
                    Close
                </Button>
                <Button v-if="ready" class="flex-1 btn-success" :onClick="onWithdraw">Withdraw Funds</Button>
            </div>
    </Modal>
</template>

<script setup="props, {emit}">
import { ref, inject, watch, computed, onUpdated, defineProps, defineEmit } from 'vue'
import { Calendar, DatePicker } from 'v-calendar';

import Modal from '@/components/Modal';
import Button from '@/components/Button.vue';
import EthInput from '@/components/EthInput';
import CurrencyExchange from '@/services/CurrencyExchange';
import { toEther } from '@/services/Helpers';

import bc from '../services/Blockchain';

const props = defineProps({
    trust: Object,
});

const exchange = inject('exchange');

const eth2usd = computed(() => exchange.eth2usdFormatted(toEther(props.trust.etherAmount)));

const emit = defineEmit(['cancel', 'withdraw']);

// Variables
const open = ref(true);
const ethWithdraw = ref(0);
const ready = computed(() => props.trust.maturityDate * 1000 < new Date());
const onCancel = () => { open.value = false; emit('cancel'); };
const onWithdraw = () => { open.value = false; emit('withdraw', ethWithdraw.value); };

</script>

<style scoped>
</style> 
