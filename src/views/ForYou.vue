<!--
    The primary view of trusts "for you" (this is designed for the beneficiaries )
-->
<template>
    <div v-if="bc.state.isConnected && ts.state.isConnected">
        <PageTitle >
            <template v-slot:title>Trusts Created for You</template>
        </PageTitle>
        <div class="px-5">
            <ForYouList/>
        </div>
    </div>
    <!-- 
        When empty, display some helpful text
    --> 
    <ConnectBlock/>

</template>

<script setup>
import { ref } from 'vue';

import PageTitle from '../components/PageTitle';
import ForYouList from '../components/ForYouList';
import ConnectBlock from '../components/ConnectBlock';
import bc from '../services/Blockchain';
import ts from '../services/TrustContract';

const onItemsLoaded = (num) => {
    //displayHelpText.value = num === 0;
}

</script>