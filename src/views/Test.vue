<!--
    TESTING goes here
-->
<template>
    <div v-if="false" class="m-5">
        <TestComponent/>
    </div>

    <div v-if="true" class="m-5">

        <ToastNotification :open="toast.open">
            <template v-slot:title>{{toast.title}}</template>
            <template v-slot:message>{{toast.message}}</template>
        </ToastNotification>
        <div class="flex space-x-2">
            <Button @click="back" class="btn-primary">
                back
            </Button>
            <Button @click="next" class="btn-primary">
                next
            </Button>
            <Button @click="showNotification" class="btn-primary">
                Test Notification
            </Button>
            <Button @click="openDlg=!openDlg" class="btn-primary">
                Open Dialog
            </Button>
        </div>
        <Modal :open="openDlg" @cancel="openDlg=false">
            <template v-slot:title>Create a new trust</template>
            <CreateWizBeneficiary class="window mr-5 max-w-2xl" :trust="trust" />
            <div class="mt-2 flex justify-end space-x-2">
                <Button class="btn btn-primary" @click="openDlg = !openDlg">Cancel</Button>
                <Button class="btn btn-primary" @click="openDlg = !openDlg">OK</Button>
            </div>
        </Modal>
        <div class="mt-10">
        <transition :name="panelClass">
            <CreateWizBeneficiary class="window mr-5 max-w-2xl" :trust="trust" v-show="currentPanel === 0"/> 
        </transition>
        <transition :name="panelClass">
            <CreateWizDetails class="window mr-5 max-w-2xl" :trust="trust" v-show="currentPanel === 1"/> 
        </transition>
        <transition :name="panelClass">
            <CreateWizFund class="window mr-5 max-w-2xl"  :trust="trust" v-show="currentPanel === 2"/> 
        </transition>
        <transition :name="panelClass">
            <CreateWizConfirm class="window mr-5 max-w-2xl"  :trust="trust" v-show="currentPanel === 3"/> 
        </transition>
        </div>          
        <div v-if="false">
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
            </div>

            Wallet private key: {{ privateKey }}<br/>
            Wallet public key: {{ publicKey }}<br/>
            Wallet Mnemonic: {{ mnemonic }}<br/>

            12 word pass-phrase
            <input type="text" v-model="mnemonicInput" name="mnemonicInput" id="mnemonicInput" autocomplete="mnemonicInput" />
            <Button class="btn btn-primary" @click="onSearch">Find my trust</Button>
            Found Your Account: {{ foundAddress }} 

            <div v-if="bc.state.isConnected && ts.state.isConnected" class="grid mt-20 grid-cols-1 lg:grid-cols-2 gap-4">
                <TrustCard v-for="trust in myTrusts" :key="trust.ID" :trust="trust" @click="onSelectItem(trust)"/>
            </div>
        </div> 
    </div>
</template>

<script setup>
import Web3 from 'web3';
import { ethers, Wallet } from "ethers";

import { ref, inject, computed, onBeforeMount } from 'vue';

import CreateWizBeneficiary from '../components/CreateWizBeneficiary';
import CreateWizDetails from '../components/CreateWizDetails';
import CreateWizFund from '../components/CreateWizFund';
import CreateWizConfirm from '../components/CreateWizConfirm';

import EthInput from '../components/EthInput';
import Modal from '../components/Modal';
import Button from '../components/Button';
import TrustCard from '../components/TrustCard';
import TrustCardEx from '../components/TrustCardEx';
import ToastNotification from '../components/Toast';
import TestComponent from '../components/TestComponent';
import CreateWiz from '../components/CreateWiz';
import bc from '../services/Blockchain';
import ts from '../services/TrustContract';
import { toWei } from '../services/helpers';

const trust = ref({});
const openDlg = ref(false);

const panelClass = ref("slide-left");

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

const showBCInfo1 = ref(false);
const showBCInfo2 = ref(false);
const showBCInfo3 = ref(false);
const showBCInfo4 = ref(false);

const currentPanel = ref(0);

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

const next = () =>
{
    panelClass.value = "slide-left";
    if(currentPanel.value < 3)
        currentPanel.value++;
}

const back = () =>
{
    panelClass.value = "slide-right";
    if(currentPanel.value > 0)
        currentPanel.value--;
}
const showNotification = (title="Title", message="Message", timeout=3000) =>
{
    toast.value.title = title;
    toast.value.message = message;
    toast.value.open = true;
    setTimeout(() => { toast.value.open = false }, timeout);
}

const beforeMount = onBeforeMount(() => {
    trust.value = { 
        key: '',
        name: '',
        etherAmount: toWei("1"),
        creator: "",
        maturityDate: new Date() / 1000,
        beneficiary: '',
        trustee: ''
    };
    console.log("Setup trust: ", trust.value);
});


</script>

<style scoped>
    .slide-left-enter-active {
        @apply transition transform ease-out duration-300;
    }
    .slide-left-enter-from {
        @apply translate-x-full opacity-50;
    }
    .slide-left-enter-to {
        @apply translate-x-0 opacity-100;
    }
    .slide-left-leave-active {
        @apply transition transform ease-in duration-300;
    }
    .slide-left-leave-from {
        @apply translate-x-0 opacity-100;
    }
    .slide-left-leave-to {
        @apply -translate-x-full opacity-50;
    }

    .slide-right-enter-active {
        @apply transition transform ease-out duration-300;
    }
    .slide-right-enter-from {
        @apply -translate-x-full opacity-50;
    }
    .slide-right-enter-to {
        @apply translate-x-0 opacity-100;
    }
    .slide-right-leave-active {
        @apply transition transform ease-in duration-300;
    }
    .slide-right-leave-from {
        @apply translate-x-0 opacity-100;
    }
    .slide-right-leave-to {
        @apply translate-x-full opacity-50;
    }

    .window {
        height: 57vh;
        width: 95%;
        margin-right: 1.25rem;
    }
    .fold-left-enter-active {
        @apply transition transform ease-out duration-1000;
    }
    .fold-left-enter-from {
        @apply origin-bottom-right rotate-90 opacity-50;
    }
    .fold-left-enter-to {
        @apply origin-bottom-right rotate-0 opacity-100;
    }
    .fold-left-leave-active {
        @apply transition transform ease-in duration-1000;
    }
    .fold-left-leave-from {
        @apply origin-bottom-left rotate-0 opacity-100;
    }
    .fold-left-leave-to {
        @apply origin-bottom-left -rotate-90 opacity-50;
    }

    .fold-right-enter-active {
        @apply transition transform ease-out duration-1000;
    }
    .fold-right-enter-from {
        @apply -translate-x-full opacity-50;
    }
    .fold-right-enter-to {
        @apply translate-x-0 opacity-100;
    }
    .fold-right-leave-active {
        @apply transition transform ease-in duration-1000;
    }
    .fold-right-leave-from {
        @apply translate-x-0 opacity-100;
    }
    .fold-right-leave-to {
        @apply translate-x-full opacity-50;
    }

</style>
