<!--
    The primary list of trusts "for you" (this is designed for the beneficiaries )
-->
<template>
    <div class=" m-10 mt-10 " v-if="!trusts.length">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">There arent any trust funds for you yet. </span>
            <span class="block mt-10 text-indigo-600 xl:inline">Maybe later...</span>
        </h1>
    </div>
    <div v-else-if="trusts.length" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TrustCardEx v-for="trust in trusts" :selectable="true" :key="trust.ID" :trust="trust" @click="onSelectItem(trust)"/>
    </div>
</template>

<script setup="{emit}">
import { ref, watch, computed, onMounted } from 'vue'

import TrustCardEx from './TrustCardEx';
import bc from '../services/Blockchain';
import ts from '../services/TrustContract';

/*
    trust.key
    trust.name
    shortenAddress(trust.beneficiary
    getEther(trust.etherAmount
    shortenAddress(trust.creator
    toDate(trust.createdDate
    toDate(trust.maturityDate
*/
let trusts = computed(() => { return ts.state.trusts.filter(trust => trust.beneficiary.toLowerCase() === bc.state.mainAccount.toLowerCase()); });

//
// Event Handlers
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
    console.log(`onWithdraw() ${selectedTrust.value.key}: ${amount}, Account: ${bc.mainAccount}`);
      
    ts.withdraw(selectedTrust.value.key, toWei(amount), bc.mainAccount);
    closeEditDialog();
}

</script>

<style scoped>
</style>
