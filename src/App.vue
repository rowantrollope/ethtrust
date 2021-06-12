<template>

    <div class="border bg-gray-700 items-center flex space-x-3 p-4 ">
        <div class="brand">Test App</div>
        <router-link class="router-link" to="/">
            Home
        </router-link>
        <router-link class="router-link" to="/about">
            About
        </router-link>
        <div class="flex-auto bg-white"></div>
        <div class="bg-white p-2 rounded-2xl bg-gray-100 text-black">
            {{ store.state.isConnected ? store.state.mainAccount : "Not Connected" }}
            Balance: {{ store.state.trustSvc.getEthBalance(6) }} ETH
        </div>
    </div>
    <div class="hidden border items-center flex space-x-2 p-5">
        <div class="bg-black p-3 rounded-xl text-white text-xl">Item 1</div>
        <div class="bg-red-500 p-3 rounded-xl text-white text-xl">Item 2</div>
        <div class="bg-blue-500 p-3 rounded-xl text-white flex-auto text-xl"></div>
        <div class="bg-green-500 p-3 rounded-xl text-white text-xl">Item 4</div>
    </div>
    <router-view/>
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import Web3 from 'web3';
    import TrustService from './TrustService.js';
    import store from './store';
    
    const init = async () => { 
        let ts = new TrustService;
        store.state.trustSvc = ts;

        await ts.init();
        console.log("ts.Init() returned", ts)
        
        // Make these variables reactive...
        store.state.isConnected = ts.isConnected;
        store.state.connectionError = ts.connectionError;
        store.state.balance = ts.balance;
        store.state.mainAccount = ts.mainAccount;
    }
    init();
    //const beforeMount = onBeforeMount( () => {}});

</script>

<style scoped>
    .brand {
        @apply text-3xl text-white mr-5;
    }
    .router-link {
        @apply rounded-lg text-lg p-3 px-5 text-white;
    }
    .router-link-active {
        @apply bg-black text-white;
    }
</style>
