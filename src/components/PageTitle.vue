<!--
    Page title used - generic component.  Supports a title and buttons area
--> 
<template>
    <div class="sticky top-0 backdrop-filter shadow-sm backdrop-blur-md bg-opacity-60 z-30 -ml-4 -mr-4 px-4 pt-2 border-b border-b-2 border-gray-300 mb-4 bg-white">
        <div class="px-1 pb-2 flex items-center justify-between">
            <h2 class="title">
                <slot name="title"></slot>
            </h2>
            <slot name="buttons"></slot>
        </div> 
   </div>

</template>

<script setup>

</script>

<style>
    .title {
        @apply ml-2 text-4xl font-sans font-black text-black;
    }
</style>
