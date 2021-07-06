<!--
    A little test component
--> 
<template>
    <div class="p-20">
        <div class="text-4xl font-black leading-tight">
        Hello World
        </div>
        <Button class="btn btn-primary" :click="move">Move!</Button>
        <div class="mt-5 gap-5 grid grid-cols-2 grid-rows-2 text-2xl text-black">
            <div :class="cls1" class="slide" >a</div>
        </div>
    </div>
</template>

<script setup="props, {emit}">
import Button from '../components/Button'
import { ref } from 'vue';

const cls = ref('');
const move = () => {
    cls1.value = "left-0"
    setTimeout(() => { cls1.value="left-1/2" }, 2000);
}
</script>

<style scoped>
    .slider {
      position: relative;
      z-index: 1;
      overflow: hidden;
      height: 57vh;
    }
    .slide {
        @apply
        bg-black 
        text-white 
        rounded-lg
        absolute
        left-1/2
        top-1/2
        ease-in-out
        duration-700;
    }
    .xxx {
      position: absolute;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      transition: left 800ms;
    }
    .list-item
    {
        position: absolute;
        transition: left 800ms;
        width: 100%;
        height: 100%;
    }
</style>
