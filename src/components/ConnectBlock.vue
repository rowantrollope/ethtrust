<template>
    <div v-if="!store.state.isConnected">
        <h1 class="text-4xl mt-10 ml-5 tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block inline">Lets get you started! </span>
        </h1>
        <div class="ml-20 text-2xl mt-10 ml-5 tracking-tight font-extrabold text-gray-900">
            <div class="flex items-center space-x-5 mt-10">
                <span class="block text-indigo-600">Click </span>
                <Button class="btn-rounded btn-success" @click="onConnect">Connect</Button>
                <span class="block text-indigo-600">to connect your wallet</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from '../store';
import Button from '../components/Button';

const onConnect = () => {
    let ts = store.state.trustSvc;

    if(!ts.isConnected) {
        ts.connect().then(() => {
            // Make these variables reactive...
            store.state.isConnected = ts.isConnected;
            store.state.connectionError = ts.connectionError;
            store.state.balance = ts.balance;
            store.state.mainAccount = ts.mainAccount;            
        });
    }
}

</script>
