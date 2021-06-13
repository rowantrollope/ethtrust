<template>
    <Dialog open={isOpen} onClose={setIsOpen}>
        <Dialog.Overlay />

        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
            This will permanently deactivate your account
        </Dialog.Description>

        <p>
            Are you sure you want to deactivate your account? All of your data will
            be permanently removed. This action cannot be undone.
        </p>

        <button onClick="{() => setIsOpen(false)}">Deactivate</button>
        <button onClick="{() => setIsOpen(false)}">Cancel</button>
    </Dialog>
</template>

<script setup="props, {emit}">
import { ref, watch, defineProps, defineEmit } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationIcon } from '@heroicons/vue/outline'
import Button from './Button.vue';

const props = defineProps({
        trust: Object,
});

const emit = defineEmit(['save', 'cancel']);

// Variables
const open = ref(true)

// Methods
watch(open, (val) => { console.log("Open changed: ", val); });
const onSave = () => { open.value = false; emit('save'); };
const onCancel = () => { open.value = false; emit('cancel'); };


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
        @apply text-lg leading-6 font-medium text-gray-900;
}
.dialog-body {
        @apply mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left;
}
.dialog-footer {
        @apply mt-5 sm:mt-4 sm:flex sm:flex-row-reverse;
}

</style> 
