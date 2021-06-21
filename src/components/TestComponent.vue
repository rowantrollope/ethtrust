<template>
    <input class="input-field" :value="inputValue" v-on="inputEvents"/>
    <input class="input-field" v-model="nbr"/>
    <input class="input-field" v-model="str"/>
</template>

<script setup="props, {emit}">
import { defineProps } from 'vue'

const props = defineProps({
    nbr: Number,
    str: String,
});
</script>

<style scoped>
.input-field {
    @apply  text-lg p-2 block border focus:ring-indigo-500 focus:border-indigo-500 w-full min-w-0 rounded-md border-gray-300;
}
.label-text {
    @apply block text-left text-lg font-medium text-gray-700;
}
</style> 
