<template>
    <PageTitle>
        <template v-slot:title> Active Trusts </template>
        <template v-slot:buttons> 
            <Button class="btn-rounded btn-primary" :onClick="createNew">
                Create New
            </Button>            
        </template>
    </PageTitle>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div v-for="trust in trusts" :key="trust.ID" class="card" @click="selectItem(trust)">

            <div class="card-tag">
                <CashIcon class="card-icon"/>
            </div>

            <div class="card-body">
                <a href="#">
                    <p class="card-header">
                        {{ trust.name }}
                    </p>
                    <p> Trust ID: <b>{{ shortenAddress(trust.ID) }} </b> </p>
                    <p> Beneficiary: <b>{{ shortenAddress(trust.beneficiary) }} </b> </p>
                    <p> Value: <b>{{ trust.value }} </b> </p>
                    <p> Maturity Date: <b>{{ trust.maturity }}</b> </p>
                </a>
            </div>

        </div>
    </div>
    
    <Modal :show="isModalVisible" :trust="selectedTrust" :create="bCreate" @save="onSave" @cancel="onCancel" @delete="onDelete">
        <template v-slot:title>{{dialogTitle}}</template>
    </Modal>

</template>

<script setup="props, {emit}">

import { defineProps, reactive } from 'vue'
import { ref } from 'vue'
import { CashIcon } from '@heroicons/vue/outline'

import Modal from './Modal.vue';
import PageTitle from './PageTitle.vue';
import Button from './Button.vue';

const trusts = ref([
  {
    item: 0,
    ID: '0x5946AfBcaC1749F2ceDF20f344a4EbA82be5b49E',
    name: 'Paxton Trollope',
    value: '1 ETH',
    maturity: '10/10/2030',
    beneficiary: '0xffffAfBcaC1749F2ceDF20f344a4EbA82be5efee',
  },
  {
    item: 1,
    ID: '0x5946AfBcaC1749F2ceDF20f344a4EbA82be5b49E',
    name: 'Paxton Trollope',
    value: '1 ETH',
    maturity: '10/10/2030',
    beneficiary: '0x5467AfBcaC1749F2ceDF20f344a4EbA82be51234',
  },
  {
    item: 2,
    ID: '0x5946AfBcaC1749F2ceDF20f344a4EbA82be5b49E',
    name: 'Paxton Trollope',
    value: '1 ETH',
    maturity: '10/10/2030',
    beneficiary: '0x9876AfBcaC1749F2ceDF20f344a4EbA82be5e342',
  },
  {
    item: 3,
    ID: '0x5946AfBcaC1749F2ceDF20f344a4EbA82be5b49E',
    name: 'Paxton Trollope',
    value: '1 ETH',
    maturity: '10/10/2030',
    beneficiary: '0xaa34AfBcaC1749F2ceDF20f344a4EbA82be5a34e',
  },
  // More people...
]);

const props = defineProps({
  msg: String,
})

const isModalVisible = ref(false);
const selectedTrust = ref([]);
let trustBeforeEdit;
const dialogTitle = ref('Dialog Title');

const bCreate = ref(false);

const openTrustDialog = (trust, createNew) => { 
    
    bCreate.value = createNew; 

    selectedTrust.value = trust; 

    if(bCreate.value)
        dialogTitle.value = "Create New Trust";
    else   
        dialogTitle.value = "Edit Trust";

    isModalVisible.value = true; 
};

const shortenAddress = (str) => { return str.substr(0, 6) + '\u2026' + str.substr(str.length-4, 4); };

const closeTrustDialog = () => { isModalVisible.value = false; };

const onSave = () => { 
    if(bCreate.value) {
        trusts.value.push(selectedTrust.value);
        bCreate.value = false;
    }

    closeTrustDialog(); 
};
const onDelete = () => { 
    console.log("Selected Trust to delete", selectedTrust.value);

    //delete trusts[selectedTrust.value.item];
    trusts.value = arrayRemove(trusts, selectedTrust.value);
    console.log(trusts);
    closeTrustDialog(); 
};
function arrayRemove(arr, value) { 
    console.log("Array remove", arr, value)
        return arr.value.filter(function(ele){ 
            return ele != value; 
        });
    }
const onCancel = () => { 
    Object.assign(selectedTrust.value, trustBeforeEdit); 
    closeTrustDialog(); 
};

const selectItem = (trust) => { 

    trustBeforeEdit = Object.assign({}, trust); 
    openTrustDialog(trust, false);

};

const createNew = () => { 
    let t = { 
        ID: '0x0',
        name: '',
        value: 1,
        maturity: '10/10/2030',
        beneficiary: '',
    };

    openTrustDialog(t, true);    
    
};

const state = reactive({ count: 0 })

const init = async () => {
//  console.log("LinkCards Props: ", props.msg);
}


init()

</script>

<style scoped>
    .card {
        @apply relative 
        py-0 
        flex 
        space-x-3 
        items-center 
        rounded-2xl
        shadow-sm 
        border 
        border-gray-300 
        bg-white 
        hover:border-gray-800 
        focus-within:ring-2 
        focus-within:ring-offset-4 
        focus-within:ring-black 
    }
    .card-tag {
        @apply flex-shrink-0 
            flex 
            items-center 
            bg-gray-100 
            text-white 
            justify-center 
            w-20 
            h-full 
            rounded-l-2xl;
    }
    .card-icon {
        @apply inline text-gray-400 h-10 w-10;
    }
    .card-header {
        @apply text-lg mb-2 font-light text-black;
    }
    .card-body {
        @apply text-black text-sm flex-1 min-w-0 mt-2 mb-2
    }
</style>
