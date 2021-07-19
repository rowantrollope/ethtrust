<!--
    This is the primary list for "Manage trusts"
-->
<template>
    <div v-if="!trusts.length">
        <h1 class="text-3xl mt-10 ml-5 tracking-tight font-thin text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block inline">Let's make your first Trust fund </span>
            <div class="flex items-center space-x-5 mt-10 ml-10 ">
                <span class="block text-3xl sm:text-3xl md:text-5xl text-indigo-600">Click </span>
                <Button class="btn-rounded text-3xl sm:text-3xl md:text-5xl btn-primary" @click="$emit('create-clicked')">Create New</Button>
                <span class="block text-3xl sm:text-3xl md:text-5xl text-indigo-600">to begin</span>
            </div>
        </h1>
    </div>

    <div v-else-if="trusts.length" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <transition-group name="list">
            <TrustCard v-for="trust in trusts" :key="trust.key" :trust="trust" @click="onSelectItem(trust)"/>
        </transition-group>
        <div class="create-new-card hover:border-white p-20 hover:shadow-lg text-gray-300  hover:text-indigo-500" @click="$emit('create-clicked')">
            <div class="flex-shrink rounded-lg text-center text-xl "> Create New Trust</div>
        </div>
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
import { ref, defineProps, computed, watch, onMounted, defineEmit } from 'vue'

import Button from '@/components/Button';
import EditTrust from '@/components/EditTrust';
import TrustCard from '@/components/TrustCard';
import ToastNotification from '@/components/Toast';
import { toWei,  } from '@/services/Helpers'
import bc from '@/services/Blockchain';
import ts from '@/services/TrustContract';

const trusts = computed(() => { return ts.state.trusts.filter(trust => trust.creator.toLowerCase() === bc.state.mainAccount.toLowerCase()) } );

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

//
// Edit handlers
//
const isEditDialogVisible = ref(false);
const selectedTrust = ref([]);

let trustBeforeEdit;

const onSelectItem = (trust) => { 
    trustBeforeEdit = Object.assign({}, trust); 
    selectedTrust.value = trustBeforeEdit; 
    isEditDialogVisible.value = true; 
}

const closeEditDialog = () => { isEditDialogVisible.value = false; };

const onSave = async () => { 
    closeEditDialog(); 

    await ts.updateTrust(selectedTrust.value.key, 
                         selectedTrust.value.beneficiary,
                         selectedTrust.value.trustee,
                         selectedTrust.value.name,
                         selectedTrust.value.maturityDate, 
                         bc.state.mainAccount).then( () => {
    
        showToast('Success', 'Trust Updated Successfully');    
    })

}

const onDelete = async () => { 
    closeEditDialog();

    console.log("OnDelete", selectedTrust.value.key);

    await ts.deleteTrust(selectedTrust.value.key).then( () => {
        
        showToast('Success', 'Trust Deleted'); 
    });
}

const onWithdraw = async (amount) => {
    closeEditDialog();

    console.log("onWithdraw", selectedTrust.value);
    
    await ts.withdraw(selectedTrust.value.key, toWei(amount), bc.state.mainAccount).then ( () => {
        
        showToast('Success', `Withdrew ${amount} successfully`);    
    });

}

const onDeposit = async (amount) => {
    closeEditDialog();    

    await ts.deposit(selectedTrust.value.key, toWei(amount), bc.state.mainAccount).then( () => {    
        
        showToast('Success', `Deposited ${amount} successfully`);
    });

}  

const onCancelEdit = () => { 
    Object.assign(selectedTrust.value, trustBeforeEdit); 
    closeEditDialog(); 
};

</script>

<style scoped>
    .create-new-card {
        @apply cursor-pointer 
            border-2 
            border-dashed
            border-gray-300 
            rounded-lg 
            h-48 
            hover:text-indigo-500
            hover:shadow-md
            hover:border-white
            hover:bg-gray-100
    };


.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}


</style>
