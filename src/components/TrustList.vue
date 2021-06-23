<template>

    <!--
        This is the primary list
    -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
import Button from './Button';

import { toWei,  } from '../helpers'

const props = defineProps({
    reload: Boolean,
});

const emit = defineEmit(['items-loaded']);

const trusts = ref([]);

const changed = watch(() => store.state.ts.mainAccount,
  (account, prevAccount) => {
    console.log("MainAccountChanges()", account);
    loadTrusts();
  }
)

const reload = watch(() => props.reload,
  (val, prevVal) => {
    if(val)
        loadTrusts();
    props.reload = false;
  }
)

const connected = watch(() => store.state.ts.isConnected,
  (connected, prevConnected) => {
    if(connected)
        loadTrusts();
  }
)
//
// Edit handlers
//
const isEditDialogVisible = ref(false);
const selectedTrust = ref([]);

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
    const account = store.state.ts.mainAccount;
    const key = trust.key;
    const amount = toWei(_amount);

    console.log(`deposit() ${trust.key}: ${amount}, Account: ${store.state.mainAccount}`);
   
    await store.state.ts.trustContract.methods.depositTrust(key)
        .send( {value: amount.toString(), from: account });
    
    await loadTrusts();
}
const withdraw = async (trust, _amount) => {
    // setup the values
    const account = store.state.ts.mainAccount;
    const key = trust.key;
    const amount = toWei(_amount);

    console.log(`withdraw() ${trust.key}: ${amount}, Account: ${store.state.ts.mainAccount}`);
   
    await store.state.ts.trustContract.methods.withdraw(key, amount)
        .send( { from: account });
    
    await loadTrusts();
}
const onCancelEdit = () => { 
    Object.assign(selectedTrust.value, trustBeforeEdit); 
    closeEditDialog(); 
};

const updateTrust = async (trust) => {
    
    // setup the values
    const account = store.state.ts.mainAccount;
    const date = trust.maturityDate;
    const beneficiary = trust.beneficiary;
    const name = trust.name;

    console.log(`UpdateTrust ${trust.key}: Name: ${name}, Date: ${date}, Beneficiary: ${beneficiary}, Account: ${store.state.mainAccount}`);
    
    await store.state.ts.trustContract.methods.updateTrust(trust.key, beneficiary, name, date)
        .send( { from: account });

}

const deleteTrust = async (trust) => {
    console.log("Delete Trust " + trust.key);
    await store.state.ts.trustContract.methods.withdrawAll(trust.key).send( { from: store.state.mainAccount } );
    await store.state.ts.trustContract.methods.deleteTrust(trust.key).send( { from: store.state.mainAccount } );
    await loadTrusts();
}

/*

LOAD TRUSTS 

*/
const loadTrusts = async() => {
    
    trusts.value = [];

    trusts.value = await store.state.ts.load((trust) => { 
        return trust.creator.toLowerCase() === store.state.ts.mainAccount.toLowerCase(); } ); 
    
    console.log(trusts.value.length);

    emit('items-loaded', trusts.value.length);
}

const mounted = onMounted(() => {
    loadTrusts();
    return;
})

</script>

<style scoped>
</style>
