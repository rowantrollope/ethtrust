/*

    CurrencyExchange.js

    Component used to translate currencies, uses cryptocompare

*/
import { ref } from 'vue';
import { round, toEther } from '@/services/Helpers';

export default class currencyExchange {

    data() {
        return {
            exchange: {},
            formatter: null,
        }
    }
    
    name = ref("CurrencyExchange");

    constructor() {
        this.name.value = "CurrencyExchange";
        //console.log(this.name + "Constructor");
        this.init();
    }
    
    async init() {
        // LOAD ETH-USD 
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC,EUR");
        const data = await response.json();
        this.exchange = data;   
        //console.log(this.exchange); 

        // Create our number formatter.
        this.formatter = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2});
    }

    // HELPERS

    eth2usd(eth) {

        if(!this.exchange) 
            return;
            
        return this.exchange.USD * eth;
    }

    eth2usdFormatted(eth) {
        if(!this.formatter || !this.exchange)
        {
            console.error("Exchange Not Ready", this.formatter, this.exchange)
            return;

        }

        return this.formatter.format(this.eth2usd(eth));
    }
}


