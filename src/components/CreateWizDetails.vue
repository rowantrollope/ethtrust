<!--
    Create Wizard Maturity Date
--> 
<template>
    <div class="absolute overflow-y-auto">
        <div class="px-4 mt-4 sm:px-6 flex items-center space-x-5 ">
            <h3 class="text-2xl font-medium leading-6 text-gray-900">
                <slot></slot>
            </h3>
        </div>
        <div class="text-lg px-4 py-2">
            <dl class="sm:divide-y sm:divide-gray-200">

                <div class="row">
                    <dt class="input-label">
                        Maturity Date
                    </dt>
                    <dd class="input-col flex">
                        <DatePicker v-model="maturityDate" mode="date" class="flex-grow"/>
                    </dd>
                </div>
                <div class="input-description"> 
                    The "Maturity Date" is the date at which this trust will become available to the benficiary.
                    this date can be changed at a later time by you, OR by a trustee in the event of your death.
                </div>

                <div v-if="false" class="row">
                    <dt class="input-label">
                        Maturity Rules
                    </dt>
                    <dd class="input-col">
                        <input type="text" 
                                placeholder="Enter Address of SmartContract TrustRules"
                                v-model="trust.rulesContract" 
                                name="rules_contract" 
                                id="rules_contract" 
                                autocomplete="rules_contract" 
                                class="input-field" />       
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<script setup="props, {emit}">
import { ref, defineProps, onUpdated, onMounted } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';

import Button from '@/components/Button';
import { toDate } from '@/services/Helpers'

const props = defineProps({
    trust: Object,
});

const maturityDate = ref(Date);

const mounted = onMounted(() => {
    maturityDate.value = new Date(props.trust.maturityDate) * 1000;

    console.log("CreateWizDetails::onMounted()", props.trust.maturityDate, maturityDate.value);
});

const updated = onUpdated(() => {
    props.trust.maturityDate = new Date(maturityDate.value) / 1000; 
    console.log("CreateWizDetails::onUpdated()", maturityDate.value, props.trust.maturityDate);
});

// 1625220000
</script>

<style scoped>
.input-field {
    @apply md:flex-1 text-lg -ml-3 block border-2 border-gray-200 rounded-lg w-full min-w-0 focus:ring-indigo-500 ;
}
.input-label {
    @apply font-medium text-gray-900 mt-2;
}
.input-description {
    @apply ml-10 mb-5 text-sm text-gray-400 border-none;
}
.input-col {
    @apply text-gray-400 sm:mt-0 sm:col-span-2;
}
.row {
    @apply sm:py-5 sm:grid sm:grid-cols-3 sm:gap-1 sm:px-6;
}

</style>
