import Web3 from 'web3';
import detectEthereumProvider from "@metamask/detect-provider";
import { ref, reactive } from 'vue';
import Trusts from "../../build/contracts/Trusts.json";
import bc from "../blockchain";
import { round, toEther } from "./helpers";

export default class TrustService {

    data() {
        return {
            reactive: {
                trustContract: null,
                trustCount: 0,
                exchange: {},
                provider: {},
                rememberMe: true,
                formatter: null,
            }
        }
    }
    
    constructor() {
    }
    // TODO: Implement
    async disconnect() {
        console.log("TrustService.disconnect()");
    }
    
    // Connect to blockchain and contract
    async connect() {
        return;
        console.log('connect');
        bc.state.provider = await detectEthereumProvider();
        if(bc.state.provider) {
            console.log('this.provider', bc.state.provider);

            window.web3 = new Web3(window.ethereum);

            await bc.state.provider.request({method: 'eth_requestAccounts'});
        
            bc.state.chainId = await bc.state.provider.request({ method: 'eth_chainId'});
            const account = await bc.state.provider.request({ method: 'eth_accounts'});
            // console.log("returned", this.chainId, account[0]);
            // Store the connection data, balance, etc
            bc.state.mainAccount = account[0];
            bc.state.balance = await window.web3.eth.getBalance(bc.state.mainAccount);
            bc.state.networkId = await window.web3.eth.net.getId()
            
            const networkData = Trusts.networks[bc.state.networkId]

            if(networkData) {
                try {
                    this.trustContract = new window.web3.eth.Contract(Trusts.abi, networkData.address)
                    this.trustCount = await this.trustContract.methods.getTrustCount().call();
                } catch(err) {
                    console.error("Error Connecting to trustContract: ", err);
                    console.error(this.trustContract, this.trustCount);
                    bc.state.connectionErrorMessage = err;
                    bc.state.connectionError = true;
                    bc.state.isConnected = false;
                    return;
                }

            }
            bc.state.isConnected = true;
            
            console.log("isConnected ", bc.state.isConnected);

            bc.state.provider.on('accountsChanged', this.handleAccountsChanged);
        }
    }
    async init() {
        // LOAD ETH-USD 
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC,EUR");
        const data = await response.json();
        this.exchange = data;   
        console.log(this.exchange); 

        // Create our number formatter.
        this.formatter = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2});
    }

    async load(callback) {

        if(!bc.state.isConnected)
            return;
            
        let newtrusts = [];
    
        const trustCount = await this.trustContract.methods.getTrustCount().call();
        console.log("trustCount", trustCount);
        // Load trusts
        for (var i = 0; i <= trustCount - 1; i++) {
            const key = await this.trustContract.methods.getTrustAtIndex(i).call();
            const trust = await this.trustContract.methods.getTrust(key).call(); 
            if(callback(trust))
                newtrusts = [...newtrusts, trust];
        }
        console.log("trusts", newtrusts);
        return newtrusts;
    }
    
    // For now, 'eth_accounts' will continue to always return an array
    handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
            bc.state.isConnected = false;
            bc.state.mainAccount = accounts[0];
        } else if (accounts[0] !== bc.state.mainAccount) {
            console.log("handleAccountsChanged()", accounts[0])
            bc.state.mainAccount = accounts[0];
            // Do any other work!
        }            
    }
    ETH2USD(eth) {
        if(!bc.state.isConnected)
            return;
        if(!this.exchange) 
            return;
            
        return this.exchange.USD * toEther(eth);
    }
    ETH2USDString(eth) {
        if(!bc.state.isConnected) return;

        if(!this.formatter)
        {
            this.formatter = new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0 })
        }  

        return this.formatter.format(this.ETH2USD(eth));
    }
    getEthBalance(_length) { 
        if(!bc.state.isConnected) return;

        let bal = window.web3.utils.fromWei(bc.state.balance, 'Ether');
        
        if(_length)
            return round(bal);
        else 
            return bal
    
    }
    async refreshBalance() {
        if(!bc.state.isConnected) return;

        bc.state.balance = await window.web3.eth.getBalance(bc.state.mainAccount);
    }
        
}


