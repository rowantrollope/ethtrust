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
    <ToastNotification :open="toast.open">
        <template v-slot:title>{{toast.title}}</template>
        <template v-slot:message>{{toast.message}}</template>
    </ToastNotification>

</template>

<script setup="props, {emit}">

import { ref, toRefs, defineProps, watch, onMounted } from 'vue'

import store from '../store';
import EditTrust from './EditTrust';
import TrustCard from './TrustCard';
import Button from './Button';
import ToastNotification from './Toast';
import bc from '../blockchain';
import ts from '../libs/TrustService';

const toast = ref({
    title: '',
    message: '',
    open: false,
});

const showToast = (title, message, timeout=3000) =>
{
    toast.value.title = title;
    toast.value.message = message;
    toast.value.open = true;
    setTimeout(() => { toast.value.open = false }, timeout);
}

import { toWei,  } from '../libs/helpers'

const props = defineProps({
    reload: Boolean,
});

const emit = defineEmit(['items-loaded']);

const trusts = ref([]);

const changed = watch(() => bc.state.mainAccount,
  (account, prevAccount) => {
    console.log("WATCHER FIRED mainAccount");
    console.log("MainAccountChanges()", account);
    loadTrusts();
  }, { deep: true }
)

const reload = watch(() => props.reload,
  (val, prevVal) => {
    console.log("WATCHER FIRED reload");
    if(val)
        loadTrusts();
    props.reload = false;
  }
)


const connected = watch(() => bc.state.isConnected,
  (connected, prevConnected) => {
    console.log("WATCHER FIRED isConnected");
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
    showToast("Success", "Trust Successfully Updated");
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
    const account = bc.state.mainAccount;
    const key = trust.key;
    const amount = toWei(_amount);

    console.log(`deposit() ${trust.key}: ${amount}, Account: ${bc.state.mainAccount}`);
   
    await store.state.ts.trustContract.methods.depositTrust(key)
        .send( {value: amount.toString(), from: account });
    
    await loadTrusts();
}
const withdraw = async (trust, _amount) => {
    // setup the values
    const account = bc.state.mainAccount;
    const key = trust.key;
    const amount = toWei(_amount);

    console.log(`withdraw() ${trust.key}: ${amount}, Account: ${bc.state.mainAccount}`);
   
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
    const account = bc.state.mainAccount;
    const date = trust.maturityDate;
    const beneficiary = trust.beneficiary;
    const name = trust.name;

    console.log(`UpdateTrust ${trust.key}: Name: ${name}, Date: ${date}, Beneficiary: ${beneficiary}, Account: ${store.state.ts.mainAccount}`);
    
    await store.state.ts.trustContract.methods.updateTrust(trust.key, beneficiary, name, date)
        .send( { from: account });

}

const deleteTrust = async (trust) => {
    console.log("Delete Trust " + trust.key);
    await store.state.ts.trustContract.methods.withdrawAll(trust.key).send( { from: bc.state.mainAccount } );
    await store.state.ts.trustContract.methods.deleteTrust(trust.key).send( { from: bc.state.mainAccount } );
    await loadTrusts().then( () => { showToast('Success', 'Trust Deleted'); } );
}

/*

LOAD TRUSTS 

*/
const loadTrusts = async() => {
    trusts.value = [];

    trusts.value = await store.state.ts.load((trust) => { 
        return trust.creator.toLowerCase() === bc.state.mainAccount.toLowerCase(); } ); 
    
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
