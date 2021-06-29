<!--
    A little test component
--> 
<template>

  <div class="bg-white border-2 shadow overflow-hidden sm:rounded-lg mt-10 ">
    <div class="px-4 py-5 sm:px-6 flex items-center space-x-5 ">
      <h3 class="text-2xl font-medium leading-6 text-gray-900">
        <slot></slot><br/> <span class="mt-1 font-base max-w-2xl text-sm text-gray-600">
        Enter the name of the trust, the beneficiary account, maturity date and etc
      </span>
      </h3>
      
    </div>
    <div class="border-t border-gray-200 px-4 py-5">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text font-medium text-gray-600">
            Trust name
          </dt>
          <dd class=" text-gray-900 sm:col-span-2">
          <input type="text" 
                  placeholder="(Optional) Enter a friendly name for this trust fund."
                  v-model="trust.name" 
                  name="trust_name" 
                  id="trust_name" 
                  autocomplete="trust_name" 
                  class="input-field" />
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class=" font-medium text-gray-600">
            Beneficiary Account #
          </dt>
          <dd class="mt-1  text-gray-400 sm:mt-0 sm:col-span-2">
          <input type="text" 
                  placeholder="(Required) Enter the account number of the beneficiary of this trust."
                  v-model="trust.beneficiary" 
                  name="beneficiary_account" 
                  id="beneficiary_account" 
                  autocomplete="beneficiary_account" 
                  class="input-field" />
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class=" font-medium text-gray-600">
            Trustee Account #
          </dt>
          <dd class="mt-1  text-gray-400 sm:mt-0 sm:col-span-2">
          <input type="text" 
                  placeholder="(Optional) Enter the account number of the trustee of this Trust."
                  v-model="trust.trustee" 
                  name="trustee_account" 
                  id="trustee_account" 
                  autocomplete="trustee_account" 
                  class="input-field" />
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class=" font-medium text-gray-600">
            Maturity Date
          </dt>
          <dd class="mt-1  text-gray-400 sm:mt-0 sm:col-span-2">
          <input type="text" 
                  placeholder="Enter the date upon which this trust fund will become accessible to the beneficiary"
                  v-model="trust.maturityDate" 
                  name="maturity_date" 
                  id="maturity_date" 
                  autocomplete="maturity_date" 
                  class="input-field" />
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class=" font-medium text-gray-600">
            Ether Amount
          </dt>
          <dd class="mt-1  text-gray-400 sm:mt-0 sm:col-span-2">
          <input type="number" 
                  placeholder="Enter the amount of ETH to deposit in this trust fund. "
                  v-model="trust.etherAmount" 
                  name="eth_amount" 
                  id="eth_amount" 
                  autocomplete="eth_amount" 
                  class="input-field" />       
          </dd>
        </div>
      </dl>
    </div>
  </div>

</template>

<script setup="props, {emit}">
import { ref } from 'vue';
import { PaperClipIcon } from '@heroicons/vue/solid'
import { CheckIcon } from '@heroicons/vue/solid'
import Button from './Button';

const trust = ref({});

</script>

<style scoped>
.input-field {
    @apply md:flex-1  -mt-2 -ml-3 block border-0 w-full min-w-0 focus:ring-indigo-500 ;
}
</style>
