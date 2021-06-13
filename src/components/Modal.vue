<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" @close="open = false" :open="open">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="screen-overlay" />
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    
                    <div class="dialog-window">
                        <div class="dialog-title">
                            <slot name="title"></slot>
                        </div>
                        <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="onCancel">
                                <span class="sr-only">Close</span>
                                <XIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div class="sm:flex sm:items-start">
                            <div class="dialog-body">
                                <div class="grid grid-cols-3 gap-6 justify-items-center">

                                        <div class="mt-5 mt-0 col-span-9">
                                            <form action="#" method="POST">
                                                <div class="border border-2 rounded-md px-4 py-5 bg-white sm:p-6">
                                                    <div class="grid grid-cols-12 gap-6">
                                                        <div class="col-span-6">
                                                            <label for="trust_name" class="block text-sm font-medium text-gray-700">Trust name</label>
                                                            <input type="text" v-model="trust.name" name="trust_name" id="trust_name" autocomplete="trust-name" class="block mt-1 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                        </div>

                                                        <div class="col-span-6">
                                                            <label for="eth_amount" class="block text-sm font-medium text-gray-700">ETH Amount</label>
                                                            <input type="text" v-model="trust.value" name="eth_amount" id="eth_amount" autocomplete="eth_amount" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                        </div>

                                                        <div class="col-span-12">
                                                            <label for="beneficiary_account" class="block text-sm font-medium text-gray-700">Beneficiary Account #</label>
                                                            <input type="text" v-model="trust.beneficiary" name="beneficiary_account" id="beneficiary_account" autocomplete="beneficiary_account" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                        </div>


                                                        <div class="col-span-3">
                                                            <label for="maturity_date" class="block text-sm font-medium text-gray-700">Maturity Date</label>
                                                            <input type="text" v-model="trust.maturity" name="maturity_date" id="maturity_date" autocomplete="maturity_date" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="flex mt-4 px-4 py-3 text-right sm:px-6">
                                                    <Button class="flex-1 btn-white mx-2" :onClick="onCancel" >
                                                        Cancel
                                                    </Button>
                                                    <Button v-if="!create" class="flex-1 btn-danger mx-2" :onClick="onDelete" >
                                                        Delete Trust
                                                    </Button>
                                                    <Button class="flex-1 btn-primary mx-2" :onClick="onSave">
                                                        Save Changes
                                                    </Button>                                                    

                                                </div>
                                            </form>
                                        </div>
                                    </div>

                            </div>                                
                        </div>
                    </div>

                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup="props, {emit}">
import { ref, watch, onUpdated, defineProps, defineEmit } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon, ExclamationIcon } from '@heroicons/vue/outline'
import Button from './Button.vue';

const props = defineProps({
    trust: Object,
    create: Boolean,
});

const emit = defineEmit(['save', 'cancel', 'delete']);

// Variables
const open = ref(true)

// Methods
watch(open, (val) => { console.log("Open changed: ", val); });
const onSave = () => { open.value = false; emit('save'); };
const onCancel = () => { open.value = false; emit('cancel'); };
const onDelete = () => { open.value = false; emit('delete'); };
const mounted = onUpdated(() => { console.log("onUpdated"); } );

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
.dialog-body {
    @apply mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left;
}
.dialog-footer {
    @apply mt-5 sm:mt-4 sm:flex sm:flex-row-reverse;
}

</style> 
