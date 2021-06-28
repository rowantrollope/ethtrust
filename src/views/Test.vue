<!--
    TESTING goes here
-->
<template>
    <div class="m-5">
    <TestComponent/>
    </div>
    <div class="m-5 " v-if="false">

        <ToastNotification :open="toast.open">
            <template v-slot:title>{{toast.title}}</template>
            <template v-slot:message>{{toast.message}}</template>
        </ToastNotification>
        <Button @click="showItem" class="btn btn-primary transition rounded-md p-2 text-white duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 ...">
            {{ bc.state.isConnected ? "Connected" : "Connect" }}
        </Button>
        <Button @click="testButton" class="ml-5 btn btn-primary transition rounded-md p-2 text-white duration-500 ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110 ...">
            Test Button
        </Button>
        <br/>
        Wallet private key: {{ privateKey }}<br/>
        Wallet public key: {{ publicKey }}<br/>
        Wallet Mnemonic: {{ mnemonic }}<br/>
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
        Enter 12 word pass-phrase
        <input type="text" v-model="mnemonicInput" name="mnemonicInput" id="mnemonicInput" autocomplete="mnemonicInput" />
        <Button class="btn btn-primary" @click="onSearch">Find my trust</Button>
        Found Your Account: {{ foundAddress }} 

        <div v-if="bc.state.isConnected && ts.state.isConnected" class="grid mt-20 grid-cols-1 lg:grid-cols-2 gap-4">
            <TrustCard v-for="trust in myTrusts" :key="trust.ID" :trust="trust" @click="onSelectItem(trust)"/>
        </div>

    </div>
</template>

<script setup>
import Web3 from 'web3';
import { ethers, Wallet } from "ethers";

import { ref, inject, computed } from 'vue';

import Button from '../components/Button';
import TrustCard from '../components/TrustCard';
import ToastNotification from '../components/Toast';
import TestComponent from '../components/TestComponent';
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

const myTrusts = computed(() => { return ts.state.trusts.filter(trust => trust.beneficiary === foundAddress.value) } );

const publicKey = ref('');
const privateKey = ref('');
const mnemonic = ref('');
const mnemonicInput = ref('');
let foundAddress = ref('');

const onSearch = () => {
    console.log(mnemonicInput.value);
    let foundWallet = Wallet.fromMnemonic(mnemonicInput.value);
    foundAddress.value = foundWallet.address;
}
const testButton = async () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what Metamask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    console.log("Hola")

    let newWallet = Wallet.createRandom();

    mnemonic.value = newWallet.mnemonic.phrase;
    publicKey.value = newWallet.address;
    privateKey.value = newWallet.privateKey;

    console.log(newWallet);

    let copyWallet = Wallet.fromMnemonic(mnemonic.value);

    console.log(copyWallet);

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
