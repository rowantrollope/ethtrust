<!--
    TESTING goes here
-->
<template>

    <div class="m-5 " v-if="false">

        <ToastNotification :open="toast.open">
            <template v-slot:title>{{toast.title}}</template>
            <template v-slot:message>{{toast.message}}</template>
        </ToastNotification>
                
        <Button @click="showItem" class="btn btn-primary transition rounded-md p-2 text-white duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 ...">
            {{ bc.state.isConnected ? "Connected" : "Connect" }}
        </Button>
        <Button @click="testCall" class="ml-5 btn btn-primary transition rounded-md p-2 text-white duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 ...">
            Test Call
        </Button>
        {{ exchange.name.value }}
        <div v-if="showBCInfo" class="flex flex-col text-xl space-y-2 mt-5 border-2 p-3">
            <div class="text-3xl">Blockchain info</div>
            <div> Account: {{ bc.state.mainAccount }} </div>
            <div> Balance: {{ bc.state.balance }} </div>
            <div> isConnected: {{ bc.state.isConnected }} </div>
            <div> connectionError: {{ bc.state.connectionError }} </div>
            <div> errorMessage: {{ bc.state.connectionErrorMessage }} </div>
            <div> networkId: {{ bc.state.networkId }} </div>
            <div> chainId: {{ bc.state.chainId }} </div>
            <div> etherBalance: {{ bc.etherBalance.value }} </div>
            <div> etherBalanceRounded: {{ $filters.round(bc.etherBalance.value) }} </div>
            <div> ether Balance in USD: {{ exchange.eth2usd(bc.etherBalance.value) }} </div>
            <div> ether Balance in USD Formatted: {{ exchange.eth2usdFormatted(bc.etherBalance.value) }} </div>
            <div> ETH 2 USD Exhange Rate: {{ exchange.exchange.USD }} </div>
<!-- -->
        </div>
        <div v-if="bc.state.isConnected && ts.state.isConnected" class="grid mt-20 grid-cols-1 lg:grid-cols-2 gap-4">
            <TrustCard v-for="trust in myTrusts" :key="trust.ID" :trust="trust" @click="onSelectItem(trust)"/>
        </div>

    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';

import Button from '../components/Button';
import TrustCard from '../components/TrustCard';
import ToastNotification from '../components/Toast';
import bc from '../services/Blockchain';
import ts from '../services/TrustContract';

const toast = ref({
    title: '',
    message: '',
    open: false,
});
const cs=ref('');
const text=ref("Starter");
const open=ref(true);

const exchange = inject('exchange');

const testShow = ref(false);

const showBCInfo = ref(false);

const myTrusts = computed(() => { return ts.state.trusts.filter(trust => true) } );

const testCall = async () =>
{
    text.value=!text.value;
    //open.value = !open.value;
    //setTimeout(() => { open.value = !open.value; }, 1000);
}

const showItem = () =>
{
    bc.connect().then(() => {
        showNotification("Connected", "Connected to blockchain");
        ts.init();
    }); 

}
const showNotification = (title, message, timeout=3000) =>
{
    toast.value.title = title;
    toast.value.message = message;
    toast.value.open = true;
    setTimeout(() => { toast.value.open = false }, timeout);
}

</script>

<style scoped>

</style>
