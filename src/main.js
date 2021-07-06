import { createApp, provide } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)

app.use(router);

app.config.globalProperties.$filters = {
    shortenAddress(value) { return value.substr(0, 6) + '\u2026' + value.substr(value.length-4, 4); },
    toDate(timestamp) { return new Date(timestamp * 1000).toLocaleDateString('en-US', { timezone: 'UTC' }) },
    toEther(amount) { 
        if(amount != undefined)
            return window.web3.utils.fromWei(amount, 'Ether'); 
        else   
            return "NaN";
        },
    toWei(amount) { return window.web3.utils.toWei(amount, 'Ether'); },
    round(num) { return Math.round(Number((Math.abs(num) * 100).toPrecision(16))) / 100 * Math.sign(num); },
}

app.mount('#app')
