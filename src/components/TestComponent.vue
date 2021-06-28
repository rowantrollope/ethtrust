<!--
    A little test component
--> 
<template>
      <h3 class="text-6xl font-black mt-5 leading-6 text-gray-900">
        Create new trust
      </h3>

  <nav aria-label="Progress">
    <ol class="border border-gray-300 mt-10 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
      <li v-for="(step, stepIdx) in steps" :key="step.name" class="relative md:flex-1 md:flex">
        <a v-if="step.status === 'complete'" :href="step.href" class="group flex items-center w-full">
          <span class="px-6 py-4 flex items-center text-sm font-medium">
            <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
              <CheckIcon class="w-6 h-6 text-white" aria-hidden="true" />
            </span>
            <span class="ml-4 text-sm font-medium text-gray-900">{{ step.name }}</span>
          </span>
        </a>
        <a v-else-if="step.status === 'current'" :href="step.href" class="px-6 py-4 flex items-center text-sm font-medium" aria-current="step">
          <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
            <span class="text-indigo-600">{{ step.id }}</span>
          </span>
          <span class="ml-4 text-sm font-medium text-indigo-600">{{ step.name }}</span>
        </a>
        <a v-else :href="step.href" class="group flex items-center">
          <span class="px-6 py-4 flex items-center text-sm font-medium">
            <span class="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
              <span class="text-gray-500 group-hover:text-gray-900">{{ step.id }}</span>
            </span>
            <span class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{{ step.name }}</span>
          </span>
        </a>
        <template v-if="(stepIdx !== steps.length - 1)">
          <!-- Arrow separator for lg screens and up -->
          <div class="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
            <svg class="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
              <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
            </svg>
          </div>
        </template>
      </li>
    </ol>
  </nav>

  <div class="bg-white border-2 shadow overflow-hidden sm:rounded-lg mt-10 ">
    <div class="px-4 py-5 sm:px-6 flex items-center space-x-5 ">
      <img alt="cert" width="200" height="200" src="../assets/money.png">
      <h3 class="text-2xl font-black leading-6 text-gray-900">
        Enter Trust Details <br/> <span class="mt-1 font-base max-w-2xl text-sm text-gray-600">
        Step 2: Enter the name of the trust, the beneficiary account, maturity date and etc
      </span>
      </h3>
      
    </div>
    <div class="border-t border-gray-200 px-4 py-5">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-600">
            Trust name
          </dt>
          <dd class="text-sm text-gray-900 sm:col-span-2">
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
          <dt class="text-sm font-medium text-gray-600">
            Beneficiary Account #
          </dt>
          <dd class="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
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
          <dt class="text-sm font-medium text-gray-600">
            Trustee Account #
          </dt>
          <dd class="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
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
          <dt class="text-sm font-medium text-gray-600">
            Maturity Date
          </dt>
          <dd class="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
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
          <dt class="text-sm font-medium text-gray-600">
            Ether Amount
          </dt>
          <dd class="mt-1 text-sm text-gray-400 sm:mt-0 sm:col-span-2">
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

const steps = [
  { id: 'Step 1', name: 'Create Beneficiary Account', href: '#', status: 'complete' },
  { id: 'Step 2', name: 'Trust Details', href: '#', status: 'current' },
  { id: 'Step 3', name: 'Adding Funding', href: '#', status: 'upcoming' },
]

const trust = ref({});

</script>

<style scoped>
.input-field {
    @apply md:flex-1 text-sm -mt-2 -ml-3 block border-0 w-full min-w-0 focus:ring-indigo-500 ;
}
</style>
