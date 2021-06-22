<template>
    <!--
        This is the primary list
    -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TrustCard v-for="trust in trusts" :key="trust.ID" :trust="trust" @click="onSelectItem(trust)"/>
    </div>

</template>

<script setup="{emit}">

import { watch, onMounted } from 'vue'
import { ref } from 'vue'
import store from '../store';
import TrustCard from './TrustCard';

const emit = defineEmit(['items-loaded']);
const ts = store.state.trustSvc;

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

const changed = watch(() => store.state.mainAccount,
  (account, prevAccount) => {
    console.log("MainAccountChanged()");
    loadTrusts();
  }
)
const connected = watch(() => store.state.isConnected,
  (connected, prevConnected) => {
    if(connected)
        loadTrusts();
  }
)
/*
const reload = watch(() => props.reload, 
    (reload, prevReload) => {
        console.log("Reload()");
        props.reload = false;
        loadTrusts();
    }
)
*/

//
// Event Handlers
//

//
// Edit handlers
//
const selectedTrust = ref([]);

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
   
    await ts.trustContract.methods.withdraw(key, amount)
        .send( { from: account });
    
    await loadTrusts();
}

/*

LOAD TRUSTS 

*/
const loadTrusts = async() => {

    trusts.value = await ts.load((trust) => { 
        return trust.beneficiary.toLowerCase() === store.state.mainAccount.toLowerCase(); } ); 
    
    emit('items-loaded', trusts.value.length);
}

const mounted = onMounted(() => {
    loadTrusts();
    return;
})



</script>

<style scoped>
</style>
