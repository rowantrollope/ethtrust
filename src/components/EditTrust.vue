<!--
    Dialog used to edit a trust settings.

    Handles edit of editable settings, deposit, withdraw, delete.  All actions taken through caller
    upon emitted events.

    Caller passes in a temporary trust object which can be discarded on Cancel/Close

--> 
<template>
    <Modal :open="open" @cancel="onCancel">
        <template v-slot:title>
            <slot name="title"></slot>
        </template>
        <div class="col-span-12 text-base border-gray-500 rounded-md p-2">            
            <p class="mt-1">
                <span class="-ml-2 text-green-500 text-lg flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" preserveAspectRatio="xMidYMid" viewBox="-38.39985 -104.22675 332.7987 625.3605"><path fill="#343434" d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"/><path fill="#8C8C8C" d="M127.962 287.959V0L0 212.32z"/><path fill="#3C3C3B" d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"/><path fill="#8C8C8C" d="M0 236.585l127.962 180.32v-104.72z"/><path fill="#141414" d="M127.961 154.159v133.799l127.96-75.637z"/><path fill="#393939" d="M127.96 154.159L0 212.32l127.96 75.637z"/></svg>
                    {{ $filters.toEther(trust.etherAmount) }} ETH </span>
            </p>
            <p class="mt-1">Trust #: <b>{{ $filters.shortenAddress(trust.key)}}</b></p>
            <p class="mt-1">Owner: <b>{{ trust.creator }}</b></p>
            <p class="mt-1"> Date Created: <b>{{ $filters.toDate(trust.createdDate) }}</b></p>
        </div>
        <div class="mt-5 hidden">
            <label for="tabs" class="sr-only">Select a tab</label>
            <select id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md hover:border-indigo-500">
                <option v-for="(tab, index) in tabs" :key="index"  :selected="activeTab===index">{{ tab }}</option>
            </select>
        </div>
        <div class=" mt-5 sm:block">
            <nav class="flex space-x-4" aria-label="Tabs">
                <a v-for="(tab, index) in tabs" 
                    :key="index" 
                    :href="tab.href" 
                    :class="[activeTab===index ? 'selected-tab' : 'unselected-tab', 'tab']" 
                    :aria-current="activeTab===index ? 'page' : undefined"
                    @click="activeTab = index">
                {{ tab }}
                </a>
            </nav>
        </div>
        
        <!--
            EDIT TRUST TAB
        -->
        <div v-show="activeTab===0" class="tab-content">
            <form action="#" method="POST">
                <p class="text-2xl">Edit trust fund details:</p> <br/>
                <div class="grid grid-cols-12 gap-6">
                    <div class="col-span-4 justify-self-end pt-2 ">
                        <label for="trust_name" class="label-text">Trust name</label>
                    </div>

                    <div class="col-span-8">
                        <input type="text" v-model="trust.name" name="trust_name" id="trust_name" autocomplete="trust-name" class="input-field" />
                    </div>

                    <div class="col-span-4 justify-self-end pt-2 ">
                        <label for="beneficiary_account" class="label-text">Beneficiary Account</label>
                    </div>
                    <div class="col-span-8">
                        <input type="text" v-model="trust.beneficiary" name="beneficiary_account" id="beneficiary_account" autocomplete="beneficiary_account" class="input-field" />
                    </div>
                    <div class="col-span-4 justify-self-end pt-2 ">
                        <label for="trustee_account" class="label-text">Trustee Account</label>
                    </div>
                    <div class="col-span-8">
                        <input type="text" v-model="trust.trustee" name="trustee_account" id="trustee_account" autocomplete="trustee_account" class="input-field" />
                    </div>

                    <div class="col-span-4 justify-self-end pt-2 ">
                        <label for="maturity_date" class="label-text">Maturity Date</label>
                    </div>
                    <div class="col-span-8">
                        <!--<DatePicker v-model="date"/>-->       
                        <DatePicker v-model="maturityDate" mode="date" class="flex-grow">
                            <template v-slot="{ inputValue, inputEvents }">
                                <input class="input-field"
                                    :value="inputValue"
                                    v-on="inputEvents"
                                />
                            </template>
                        </DatePicker>
                    </div>
                </div>
            </form>
            <div class="dialog-footer">
                <Button class="flex-1 btn-white mx-2" :onClick="onCancel" >
                    Cancel
                </Button>
                <Button class="flex-1 btn-primary mx-2" :onClick="onSave">
                    Save Changes
                </Button>                                                    
            </div>                               
        </div>
        <!--
            INVEST FUNDS TAB
        -->
        <div v-show="activeTab===1" class="tab-content">
            <p class="text-2xl">Invest funds:</p><br/>

            <p><b>Note: You can invest the full balance of this trust fund: </b></p><br/>
            <p>Maximum Investment: 
                <span class="text-green-500">{{$filters.toEther(trust.etherAmount)}} ETH</span>
            </p>
            <div class="grid grid-cols-12 mt-4 gap-6 items-center">
                <div class="col-span-12">
<!--                                        <input type="text" v-model="ethWithdraw" name="ethWithdraw" id="ethWithdraw" autocomplete="ethWithdraw" class="input-field" />
-->                                        <EthInput v-model="ethInvest">Enter Amount to invest</EthInput>
                </div>
            </div>

            <div class="dialog-footer">
                <Button class="flex-1 btn-white mx-2" :onClick="onCancel" >
                    Cancel
                </Button>
                <Button class="flex-1 btn-success" :onClick="onInvest">Invest Funds</Button>
            </div>
        </div>

        <!--
            WITHDRAW FUNDS TAB
        -->
        <div v-show="activeTab===2" class="tab-content">
            <p class="text-2xl">Withdraw funds from trust-fund:</p><br/>

            <p><b>Note: Funds will be returned to the owner of the trust.  Only the trust fund owner may withdraw. </b></p><br/>
            <p>Maximum withdrawal: 
                <span class="text-green-500">{{$filters.toEther(trust.etherAmount)}} ETH</span>
            </p>
            <div class="grid grid-cols-12 mt-4 gap-6 items-center">
                <div class="col-span-12">
<!--                                        <input type="text" v-model="ethWithdraw" name="ethWithdraw" id="ethWithdraw" autocomplete="ethWithdraw" class="input-field" />
-->                                        <EthInput v-model="ethWithdraw">Enter Amount to withdraw</EthInput>
                </div>
            </div>

            <div class="dialog-footer">
                <Button class="flex-1 btn-white mx-2" :onClick="onCancel" >
                    Cancel
                </Button>
                <Button class="flex-1 btn-success" :onClick="onWithdraw">Withdraw Funds</Button>
            </div>
        </div>
        <!--
            ADD FUNDS TAB
        -->
        <div v-show="activeTab===3" class="tab-content">
            <p class="text-2xl">Add funds to trust fund. </p> <br/>
            <p><b>Note: Only ETH deposits are supported at this time.</b></p><br/>
            <p class="text-xl">Your Wallet Balance: <span class="text-bold text-green-600">{{ bc.etherBalance.value }} ETH</span></p>

            <EthInput class="mt-3" v-model="ethDeposit">Deposit Amount</EthInput>

            <div class="dialog-footer">
                <Button class="flex-1 btn-white mx-2" :onClick="onCancel" >
                    Cancel
                </Button>
                <Button class="flex-1 btn-success" :onClick="onDeposit">
                    Deposit
                </Button>
            </div>

        </div>
        <!--
            DELETE TRUST TAB
        -->
        <div v-show="activeTab===4" class="tab-content">
            <div class="text-2xl">Delete trust fund? </div> <br/>
            <div class="text-xl">Trust Fund Balance is <span class="text-bold text-green-600">{{ $filters.toEther(trust.etherAmount) }} ETH</span></div><br/>
            <div class="font-bold">Deleting this trust fund will transfer {{ $filters.toEther(trust.etherAmount) }} ETH to address: <br/><br/> </div> 
            <div class="leading-tight text-center">{{trust.creator}}</div>
            <div class="dialog-footer">

                <Button class="flex-1 btn-white mx-2" :onClick="onCancel" >
                    Cancel
                </Button>
                <Button class="flex-1 btn-danger mx-2" :onClick="onDelete" >
                    Delete Trust
                </Button>
            </div>
        </div>
    </Modal>
</template>

<script setup="props, {emit}">
import { ref, watch, computed, onUpdated, defineProps, defineEmit } from 'vue'
import { Calendar, DatePicker } from 'v-calendar';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import EthInput from '@/components/EthInput';

import { toDate } from '@/services/Helpers';
import bc from '@/services/Blockchain';

const props = defineProps({
    trust: Object,
});

const activeTab = ref(0);
const tabs = ref([
          "Edit Details",
          "Invest",
          "Withdraw",
          "Deposit",
          "Delete Trust",
]);

const emit = defineEmit(['save', 'cancel', 'delete', 'withdraw', 'deposit', 'invest']);

// Variables
const open = ref(true);
const maturityDate = ref(Date);
const inputValue = ref(Date)
const ethWithdraw = ref(0);
const ethDeposit = ref(0);
const ethInvest = ref(0);

// Methods
const onSave = () => { 
    // TODO: Validate destination address
    open.value = false;
    props.trust.maturityDate = new Date(maturityDate.value) / 1000; 
    emit('save'); 
};
const onCancel = () => { open.value = false; emit('cancel'); };
const onDelete = () => { open.value = false; emit('delete'); };
const onWithdraw = () => { open.value = false; emit('withdraw', ethWithdraw.value); };
const onDeposit = () => { open.value = false; emit('deposit', ethDeposit.value); };

const updated = onUpdated(() => { 
    maturityDate.value = toDate(props.trust.maturityDate); 
});

</script>

<style scoped>

.screen-overlay {
    @apply fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity;
}    
.dialog-window {
    @apply inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 sm:max-w-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:p-6;
}
.dialog-icon {
    @apply mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10;
}
.dialog-title {
    @apply text-2xl leading-6 text-gray-900;
}
.dialog-footer {
    @apply flex mt-6 px-4 py-3 text-right;
}
.input-field {
    @apply  text-lg p-2 block border focus:ring-indigo-500 focus:border-indigo-500 w-full min-w-0 rounded-md border-gray-300;
}
.label-text {
    @apply block text-left text-lg font-medium text-gray-700;
}
.tab {
    @apply px-3 py-2 font-medium text-lg rounded-md;
}
.selected-tab {
    @apply cursor-pointer text-white bg-black rounded-md;
}
.unselected-tab {
    @apply cursor-pointer border border-white text-gray-700 hover:text-indigo-500 hover:border-indigo-500;
}
.tab-content {
    @apply border-gray-400 text-xl mt-2 border rounded-md pt-6 px-6 pb-2;
}
</style> 
