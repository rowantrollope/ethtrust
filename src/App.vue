<template>
    <Nav/>
    <router-view/>
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import Nav from './components/Nav.vue'; 
    import Web3 from 'web3';
    import TrustService from './libs/TrustService.js';
    import store from './store';
    
    const init = async () => { 
        store.state.ts.init();
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
