<template>
    <div v-if="store.state.isConnected">
        <div class="text-6xl border-b font-black leading-tight ml-5 mr-5 mt-1 mb-4">
            Your trust funds: <br/>
        </div>
        <div class="px-5">
            <ForYouList @items-loaded="onItemsLoaded"/>
        </div>
    </div>
    <!-- 
        When empty, display some helpful text
    --> 
    <ConnectBlock/>
    <div class=" m-10 mt-10 " v-if="displayHelpText">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span class="block xl:inline">There arent any trust funds for you yet. </span>
            <span class="block mt-10 text-indigo-600 xl:inline">Maybe later...</span>
        </h1>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import store from '../store';
import PageTitle from '../components/PageTitle';
import ForYouList from '../components/ForYouList';
import ConnectBlock from '../components/ConnectBlock';

const displayHelpText = ref(false);

const onItemsLoaded = (num) => {
    displayHelpText.value = num === 0;
}

</script>