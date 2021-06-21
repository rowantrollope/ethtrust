<template>

    <!-- 
        When empty, display some helpful text
    --> 
    <div v-if="firstTime">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">Lets get you started! </span>
            <span class="block mt-10 text-indigo-600 xl:inline">Click (Create New) to begin... </span>
        </h1>
    </div>
    <!--
        This is the primary list
    -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TrustCard v-for="trust in trusts" :key="trust.ID" :trust="trust" @click="onSelectItem(trust)"/>
    </div>

    <!-- 
        Modals
    --> 
    <EditTrust :show="isEditDialogVisible" :trust="selectedTrust" @save="onSave" @cancel="onCancelEdit" @delete="onDelete" @withdraw="onWithdraw" @deposit="onDeposit">
        <template v-slot:title>Trust Fund: {{ selectedTrust.name }}</template>
    </EditTrust>

</template>

<script setup="props, {emit}">

import { defineProps, watch, onMounted } from 'vue'
import { ref } from 'vue'

import store from '../store';
import EditTrust from './EditTrust';
import TrustCard from './TrustCard';
import { toWei,  } from '../helpers'

const props = defineProps({
    reload: Boolean,
});

const trusts = ref([]);

let tmoConn;

const changed = watch(() => store.state.mainAccount,
  (account, prevAccount) => {
    console.log("MainAccountChanges()");
    loadTrusts();
  }
)

const connected = watch(() => store.state.isConnected,
  (connected, prevConnected) => {
    console.log("CONNECTED!", connected, prevConnected);
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
// Edit handlers
//
const isEditDialogVisible = ref(false);
const selectedTrust = ref([]);
const firstTime = ref(false);

let trustBeforeEdit;

const onSelectItem = (trust) => { 
    trustBeforeEdit = Object.assign({}, trust); 
    openEditDialog(trustBeforeEdit);
}

const openEditDialog = (trust) => {  
    selectedTrust.value = trust; 
    isEditDialogVisible.value = true; 
};
const closeEditDialog = () => { isEditDialogVisible.value = false; };

const onSave = async () => { 
    closeEditDialog(); 

    await updateTrust(selectedTrust.value);
    await loadTrusts();
}
const onDelete = () => { 
    console.log("Selected Trust to delete", selectedTrust.value);
    deleteTrust(selectedTrust.value);
    closeEditDialog(); 
}

const onWithdraw = (amount) => {
    console.log("Request to withdraw", selectedTrust.value);
    
    withdraw(selectedTrust.value, amount);
    closeEditDialog();
}

const onDeposit = (amount) => {

    deposit(selectedTrust.value, amount);
    closeEditDialog();
    
}  
const deposit = async (trust, _amount) => {
    // setup the values
    const account = store.state.mainAccount;
    const key = trust.key;
    const amount = toWei(_amount);

    console.log(`deposit() ${trust.key}: ${amount}, Account: ${store.state.mainAccount}`);
   
    await store.state.trustSvc.trustContract.methods.depositTrust(key)
        .send( {value: amount.toString(), from: account });
    
    await loadTrusts();
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
const onCancelEdit = () => { 
    Object.assign(selectedTrust.value, trustBeforeEdit); 
    closeEditDialog(); 
};

const updateTrust = async (trust) => {
    
    // setup the values
    const account = store.state.mainAccount;
    const date = trust.maturityDate;
    const beneficiary = trust.beneficiary;
    const name = trust.name;

    console.log(`UpdateTrust ${trust.key}: Name: ${name}, Date: ${date}, Beneficiary: ${beneficiary}, Account: ${store.state.mainAccount}`);
    
    await store.state.trustSvc.trustContract.methods.updateTrust(trust.key, beneficiary, name, date)
        .send( { from: account });

}

const deleteTrust = async (trust) => {
    console.log("Delete Trust " + trust.key);
    await store.state.trustSvc.trustContract.methods.withdrawAll(trust.key).send( { from: store.state.mainAccount } );
    await store.state.trustSvc.trustContract.methods.deleteTrust(trust.key).send( { from: store.state.mainAccount } );
    await loadTrusts();
}

/*

LOAD TRUSTS 

*/
const loadTrusts = async() => {

    if(!store.state.isConnected)
        return;
    
    trusts.value = await _loadTrusts((trust) => { 
        return trust.creator.toLowerCase() === store.state.mainAccount.toLowerCase(); } ); 
    
    firstTime.value = trusts.value.length === 0;
}

const _loadTrusts = async (callback) => {

    let trusts = [];

    const trustCount = await store.state.trustSvc.trustContract.methods.getTrustCount().call();

    // Load trusts
    for (var i = 0; i <= trustCount - 1; i++) {
        const key = await store.state.trustSvc.trustContract.methods.getTrustAtIndex(i).call();
        const trust = await store.state.trustSvc.trustContract.methods.getTrust(key).call(); 
        if(callback(trust))
            trusts = [...trusts, trust];
    }
    return trusts;
}

const mounted = onMounted(() => {
    loadTrusts();
    return;
})

</script>

<style scoped>
</style>
