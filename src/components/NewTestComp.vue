<!--
    A little test component
--> 
<template>
<div id="app">
  <div class="slider">
    <ul class="slides" >
      <li class="list-item" :style="styles[0]">
        <div class="image" key="0">
          <dlg1>Step 1: Setup your trust Details</dlg1>
        </div>
      </li>
     <li class="list-item" :style="styles[1]">
          <dlg1>Step 2: FUND this trust with some ETH</dlg1>
      </li>
      <li class="list-item" :style="styles[2]">
          <dlg1>Step 3: CREATE the trust!</dlg1>
      </li>
<!--      <li class="list-item" :style="styles[3]">
        <div class="image" :style="{ backgroundImage: `url(${slides[3].img})` }" key="3"></div>
      </li>-->
    </ul>
  </div>
    <div class="flex space-x-5">
      <Button v-if="currentPanel!==0" class="flex-1 btn btn-primary-outline" :onClick="down">Back</Button>
      <Button class="flex-1 btn btn-primary" :onClick="up">{{ currentPanel == 2 ? 'Finish' : 'Next' }} > </Button>
    </div></div>
</template>

<script setup="props, {emit}">
import { ref,computed, onMounted } from 'vue';
import Button from './Button';
import dlg1 from './dlg1';

const slides = ref([
      {
        style: '',
      },
      {
        style: '',
      },
      {
        style: '',
      },
      {
        style: '',
      }
    ]);

const current = ref(0);
const timer = ref(0);
const interval = ref(0);
const progress = ref(0);
const playslides = ref([]);
let bSwitch=true;
const styles = ref([]);
const panelPos = [ { left: "-100%" }, { left: "0%" }, {left: "100%" } ];

const currentPanel = ref(0);

function next() {

    if(currentPanel.value === slides.value.length)
        return;

    if(currentPanel.value < slides.value.length) {
        slides.value[currentPanel.value].style = { left: "-100%" };
        slides.value[currentPanel.value+1].style = { left: "0%" };
        currentPanel.value++;
    }
  
}

function prev() {

    if(currentPanel.value === 0)
        return;

    if(currentPanel.value > slides.value.length) {
        slides.value[currentPanel.value].style = { left: "-100%" };
        slides.value[currentPanel.value+1].style = { left: "0%" };
        currentPanel.value++;
    }
  
}


const created = onMounted(() => {
    styles.value[0] = { left: "0%" }
    styles.value[1] = { left: "100%" }
    styles.value[2] = { left: "100%" }

});


</script>

<style scoped>
    .slider {
      position: relative;
      z-index: 1;
      overflow: hidden;
      height: 65vh;
    }

    .slides {
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
    .image {
          height: 100%;
          background-size: cover;
          background-position: 50%;
    }
</style>
