<!--
    The primary list of trusts "for you" (this is designed for the beneficiaries )
-->
<template>
    <div class=" m-10 mt-10 " v-if="!trusts.length">
        <h1 class="text-4xl tracking-tight font-thin text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">
                There arent any trust funds for you yet. 
            </span>
            <span class="block mt-10 text-indigo-600 xl:inline">Maybe later...</span>
        </h1>
    </div>
    <div v-else-if="trusts.length" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TrustCardEx v-for="trust in trusts" :selectable="true" :key="trust.ID" :trust="trust" @click="onClick(trust)"/>
    </div>
    <AccessTrust :open="isAccessDialogVisible" :trust="selectedTrust" @cancel="isAccessDialogVisible=false" @withdraw="onWithdraw"/>
</template>

<script setup="{emit}">
import { ref, watch, computed, onMounted } from 'vue'

import AccessTrust from '@/components/AccessTrust';
import TrustCardEx from '@/components/TrustCardEx';

import { toWei } from '@/services/Helpers';
import bc from '@/services/Blockchain';
import ts from '@/services/TrustContract';

let trusts = computed(() => { return ts.state.trusts.filter(trust => trust.beneficiary.toLowerCase() === bc.state.mainAccount.toLowerCase()); });

//
// Event Handlers
//
const selectedTrust = ref([]);
const isAccessDialogVisible = ref(false);

const onClick = (trust) => { 
    console.log("onSelectItem");
    selectedTrust.value = trust;
    isAccessDialogVisible.value = true;
}

const onWithdraw = (amount) => {
    console.log(`onWithdraw() ${selectedTrust.value.key}: ${amount}, Account: ${bc.mainAccount}`);
      
    ts.withdraw(selectedTrust.value.key, toWei(amount), selectedTrust.value.beneficiary);
    isAccessDialogVisible.value = false;
}

</script>

<style scoped>
</style>
