<template>
    <PageTitle >
        <template v-slot:title> Trust Funds </template>
        <template v-slot:buttons>           
            <Button class="btn-rounded btn-primary" :onClick="onCreateNew">
                Create New
            </Button>            
        </template>
    </PageTitle>

    <div class="px-5">
        <LinkCards :reload="reload" :displaymode="2"></LinkCards>
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
import LinkCards from '../components/LinkCards';
import CreateTrust from '../components/CreateTrust';
import { toWei } from '../helpers'

const selectedTrust = ref([]);
const reload = ref(false);

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
    reload.value = true;
    //await this.$refs.LinkCards.loadTrusts();
}

const createTrust = async (trust) => {
    // setup the values
    const account = store.state.mainAccount;
    const date = trust.maturityDate;
    const amount = toWei(trust.etherAmount.toString(), 'Ether');
    const address = trust.beneficiary;
    const name = trust.name;

    console.log(`CreateTrust: Amount: ${amount}, Account: ${store.state.mainAccount}`);
    
    await store.state.trustSvc.trustContract.methods.createTrust(address, name, date)
        .send( {value: amount.toString(), from: account });
    
}
const onCancelCreate = () => { 
    closeCreateDialog(); 
};


</script>
