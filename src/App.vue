<template>
    <Nav/>
    <router-view/>
</template>

<script setup>
    import { ref, provide, onBeforeMount } from 'vue';
    import Nav from './components/Nav.vue'; 
    import Web3 from 'web3';
    import ts from './services/TrustContract';
    import bc from './blockchain';
    import currencyExchange from './services/currencyExchange';

    const exchange = new currencyExchange;

    const init = async () => { 
        // PRIOR WAY to Connect to BC: store.state.ts.init();
        if(true)
        {
            bc.connect().then(() => {
                ts.init();
            }); 
        }
        
        provide('exchange', exchange);

    }
    init();

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
