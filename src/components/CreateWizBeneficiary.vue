<!--
    Create Wizard - Beneficiary
--> 
<template>
    <div class="bg-white border-2 overflow-y-auto rounded-b-lg">
        <div class="px-4 py-5 sm:px-6 flex items-center space-x-5 ">
            <h3 class="text-2xl font-medium leading-6 text-gray-900">
                <slot></slot>
            </h3>
        </div>
        <div class="text-lg px-4">
            <dl class="sm:divide-y sm:divide-gray-200">
                <div class="row">
                    <dt class="input-label">
                        Trust name
                    </dt>
                    <dd class="input-col">
                        <input type="text" 
                            placeholder="Enter name"
                            v-model="trust.name" 
                            name="trust_name" 
                            id="trust_name" 
                            autocomplete="trust_name" 
                            class="input-field" />
                    </dd>
                </div>
                <div class="input-description"> 
                    (Optional)
                    The name of the trust will be publicly visible on the blockchain. 
                </div>

                <div class="row">
                    <dt class="input-label">
                        Beneficiary
                    </dt>
                    <dd class="input-col">
                        <input type="text" 
                            placeholder="Beneficiary Account #"
                            v-model="trust.beneficiary" 
                            name="beneficiary" 
                            id="beneficiary" 
                            autocomplete="beneficiary" 
                            class="input-field" />
                    </dd>
                </div>
                <div class="input-description"> 
                    (Required)
                    The Beneficiary is the person who will get access to this trust fund after the maturity date.
                </div>

                <div class="row">
                    <dt class="input-label">
                        Trustee
                    </dt>
                    <dd class="input-col">
                        <input type="text" 
                                placeholder="Trustee Account #"
                                v-model="trust.trustee" 
                                name="trustee" 
                                id="trustee"
                                autocomplete="trustee" 
                                class="input-field" />
                    </dd>
                </div>
                <div class="input-description"> 
                    (Optional)
                    A trustee is someone who will have access to this trust fund in addition to 
                    the beneficiary. 
                </div>
            </dl>
        </div>
    </div>
</template>

<script setup="props, {emit}">
import { defineProps } from 'vue';

const props = defineProps({
    trust: Object,
});

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
