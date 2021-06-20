<template>

    <!-- 
        When empty, display some helpful text
    --> 
    <div class=" m-10 mt-10 " v-if="firstTime">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">There arent any trust funds for you yet. </span>
            <span class="block mt-10 text-indigo-600 xl:inline">Maybe later...</span>
        </h1>
    </div>
    <!--
        This is the primary list
    -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TrustCard v-for="trust in trusts" :key="trust.ID" :trust="trust" @click="onSelectItem(trust)"/>
    </div>

</template>

<script setup="props, {emit}">

import { defineProps, watch, onMounted } from 'vue'
import { ref } from 'vue'
import store from '../store';
import TrustCard from './TrustCard';
import PageTitle from './PageTitle.vue';

const props = defineProps({
    reload: Boolean,
});

const trusts = ref([]);
/*
    trust.key
    trust.name
    shortenAddress(trust.beneficiary
    getEther(trust.etherAmount
    shortenAddress(trust.creator
    toDate(trust.createdDate
    toDate(trust.maturityDate
*/

let tmoConn;

const changed = watch(() => store.state.mainAccount,
  (account, prevAccount) => {
    console.log("MainAccountChanges()");
    loadTrusts();
  }
)

const reload = watch(() => props.reload, 
    (reload, prevReload) => {
        console.log("Reload()");
        props.reload = false;
        loadTrusts();
    }
)
//
// Event Handlers
//

//
// Edit handlers
//
const selectedTrust = ref([]);
const firstTime = ref(false);

let trustBeforeEdit;

const onSelectItem = (trust) => { 
    trustBeforeEdit = Object.assign({}, trust); 
    console.log("onSelectItem");
    //openEditDialog(trustBeforeEdit);
}

const openEditDialog = (trust) => { 
    
    selectedTrust.value = trust; 
    isEditDialogVisible.value = true; 
};
const closeEditDialog = () => { isEditDialogVisible.value = false; };

const onWithdraw = (amount) => {
    console.log("Request to withdraw", selectedTrust.value);
    
    withdraw(selectedTrust.value, amount);
    closeEditDialog();
}

const withdraw = async (trust, _amount) => {
    // setup the values
    const account = store.state.mainAccount;
    const key = trust.key;
    const amount = toWei(_amount);

    console.log(`withdraw() ${trust.key}: ${amount}, Account: ${store.state.mainAccount}`);
   
    await store.state.trustSvc.trustContract.methods.withdraw(key, amount)
        .send( { from: account });
    
    await loadTrusts();
}

/*

LOAD TRUSTS 

*/
const loadTrusts = async () => {

    if(!store.state.isConnected){
        console.log("not connected... retry")
        return;
    }
    clearInterval(tmoConn);

    const trustCount = await store.state.trustSvc.trustContract.methods.getTrustCount().call();
    console.log("Connected! trustCount: ", trustCount);
    trusts.value = [];
    //r Load trusts
    for (var i = 0; i <= trustCount-1; i++) {
        const key = await store.state.trustSvc.trustContract.methods.getTrustAtIndex(i).call();
        const trust = await store.state.trustSvc.trustContract.methods.getTrust(key).call(); 
        
        if(trust.beneficiary.toLowerCase() === store.state.mainAccount.toLowerCase()) {                    
            trusts.value = [...trusts.value, trust];
        }
    }
    if(trusts.value.length > 0)
        firstTime.value = false;
    else 
        firstTime.value = true;
}

const mounted = onMounted(() => {
    tmoConn = setInterval(() => {
        loadTrusts();
    }, 250);   
})

</script>

<style scoped>
</style>
