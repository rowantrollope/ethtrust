<template>
    <PageTitle>
        <template v-slot:title> Trust funds created for you </template>
        <template v-slot:buttons>           
        </template>
    </PageTitle>    
    <div class="px-5">
        <ForYouList/>
    </div>
</template>

<script setup>
import store from '../store'
import PageTitle from '../components/PageTitle'
import ForYouList from '../components/ForYouList'

</script>