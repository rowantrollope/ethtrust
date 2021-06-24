<template>
    <div v-if="bc.state.isConnected">
        <PageTitle >
            <template v-slot:title> Trust funds created by you</template>
            <template v-slot:buttons>           
                <Button class="btn-rounded btn-primary" :onClick="onCreateNew">
                    Create New
                </Button>            
            </template>
        </PageTitle>
        <div class="px-5">
            <TrustList :reload="reload" @items-loaded="onItemsLoaded"></TrustList>
        </div>
    </div>
    <!-- 
        When empty, display some helpful text
    --> 
    <ConnectBlock/>
    <div v-if="displayHelpText">
        <h1 class="text-4xl mt-10 ml-5 tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block inline">Lets make your first Trust </span>
            <div class="flex items-center space-x-5 mt-10">
                <span class="block text-indigo-600">Click </span>
                <Button class="btn-rounded btn-primary" @click="onCreateNew">Create New</Button>
                <span class="block text-indigo-600">to begin</span>
            </div>
        </h1>
    </div>

    <!-- 
        Modals
    --> 
    <CreateTrust :show="isCreateDialogVisible" :trust="selectedTrust" @create="onCreate" @cancel="onCancelCreate">
        <template v-slot:title>Create New Trust</template>
    </CreateTrust>

</template>

<script setup>
import { ref } from 'vue';
import store from '../store';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import TrustList from '../components/TrustList';
import CreateTrust from '../components/CreateTrust';
import ConnectBlock from '../components/ConnectBlock';
import bc from '../blockchain';

import { toWei } from '../libs/helpers'

const selectedTrust = ref([]);
const displayHelpText = ref(false);
const reload = ref(false);

const onItemsLoaded = (num) => {
    displayHelpText.value = num === 0;
}
//
// Create Handlers
//
const isCreateDialogVisible = ref(false);

const openCreateDialog = (trust) => { 
    
    selectedTrust.value = trust; 
    isCreateDialogVisible.value = true; 
};

const closeCreateDialog = () => { isCreateDialogVisible.value = false; };

const onCreateNew = () => { 
    let t = { 
        key: '',
        name: '',
        etherAmount: 1,
        maturityDate: new Date() / 1000,
        beneficiary: '',
    };

    openCreateDialog(t);    
}

const onCreate = async () => { 
    closeCreateDialog(); 
    console.log(selectedTrust.value.etherAmount);
    await createTrust(selectedTrust.value);
    
    // Tell the TrustList to reload after we create a new trust
    reload.value = true;
}

const createTrust = async (trust) => {
    // setup the values
    const account = bc.state.mainAccount;
    const trustee = bc.state.mainAccount;
    const date = trust.maturityDate;
    const amount = toWei(trust.etherAmount.toString(), 'Ether');
    const address = trust.beneficiary;
    const name = trust.name;

    console.log(`CreateTrust: Amount: ${amount}, Account: ${bc.state.mainAccount}`);
    
    await store.state.ts.trustContract.methods.createTrust(address, trustee, name, date)
        .send( {value: amount.toString(), from: account });
    
}
const onCancelCreate = () => { 
    closeCreateDialog(); 
};


</script>
