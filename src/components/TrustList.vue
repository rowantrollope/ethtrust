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
import ts from '../services/TrustContract';

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

import { toWei,  } from '../services/helpers'

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
    
    await ts.deposit(key, amount, account);
    
    await loadTrusts().then( () => {
        showToast('Success', `Deposited ${amount} successfully`);    
    });  
}
const withdraw = async (trust, _amount) => {
    // setup the values
    const account = bc.state.mainAccount;
    const key = trust.key;
    const amount = toWei(_amount);

    await ts.withdraw(key, amount, account);

    await loadTrusts().then( () => {
        showToast('Success', `Withdrew ${amount} successfully`);    
    })
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

    await ts.updateTrust(trust.key, beneficiary, name, date, account);
    
    await loadTrusts().then( () => {
        showToast('Success', 'Trust Updated Successfully');    
    })
}

const deleteTrust = async (trust) => {
    console.log("Delete Trust " + trust.key);
    
    await ts.deleteTrust(trust.key);

    await loadTrusts().then( () => { 
        showToast('Success', 'Trust Deleted'); 
    });
}

/*

LOAD TRUSTS 

*/
const loadTrusts = async() => {
    trusts.value = [];

    trusts.value = await ts.load((trust) => { 
        return trust.creator.toLowerCase() === bc.state.mainAccount.toLowerCase(); } ); 
    
    emit('items-loaded', trusts.value ? trusts.value.length : 0);
}

const mounted = onMounted(() => {
    loadTrusts();
    return;
})

</script>

<style scoped>
</style>
