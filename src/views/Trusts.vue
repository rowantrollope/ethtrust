<!--
    The primary list of trusts "Manage Trusts" (this is designed for the creators )
-->
<template>
    <!-- 
        When empty, display some helpful text
    --> 
    <ConnectBlock/>
    <div v-if="displayHelpText">
        <h1 class="text-3xl mt-10 ml-5 tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block inline">Lets make your first Trust </span>
            <div class="flex items-center space-x-5 mt-10 ml-10 ">
                <span class="block text-3xl sm:text-3xl md:text-5xl text-indigo-600">Click </span>
                <Button class="btn-rounded text-3xl sm:text-3xl md:text-5xl btn-primary" @click="onCreateNew">Create New</Button>
                <span class="block text-3xl sm:text-3xl md:text-5xl text-indigo-600">to begin</span>
            </div>
        </h1>
    </div>

    <div v-else-if="bc.state.isConnected && ts.state.isConnected">
        <PageTitle >
            <template v-slot:title>Create & Manage Trusts</template>
            <template v-slot:buttons>           
                <Button class="btn-rounded btn-primary" :onClick="onCreateNew">
                    Create New
                </Button>            
            </template>
        </PageTitle>
        <div class="px-5">
            <TrustList @create-clicked="onCreateNew"></TrustList>
        </div>
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

import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import TrustList from '../components/TrustList';
import CreateTrust from '../components/CreateTrust';
import ConnectBlock from '../components/ConnectBlock';
import bc from '../services/Blockchain';
import ts from '../services/TrustContract';

import { toWei } from '../services/helpers'

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
        trustee: ''
    };

    openCreateDialog(t);    
}

const onCreate = async () => { 
    closeCreateDialog(); 
    
    console.log("Creating Trust for etherAmount: ", selectedTrust.value.etherAmount);

    // Since trustee is not required, set to beneficiary if its left empty
    if(selectedTrust.value.trustee == '')
        selectedTrust.value.trustee = selectedTrust.value.beneficiary;
    
    await ts.createTrust(
        selectedTrust.value.beneficiary, 
        selectedTrust.value.trustee,
        selectedTrust.value.name, 
        selectedTrust.value.maturityDate, 
        toWei(selectedTrust.value.etherAmount.toString(), 'Ether'), 
        bc.state.mainAccount);
    
// Tell the TrustList to reload after we create a new trust
}

const createTrust = async (trust) => {
    // setup the values

}
const onCancelCreate = () => { 
    closeCreateDialog(); 
};


</script>
