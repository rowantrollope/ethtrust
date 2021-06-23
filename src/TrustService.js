
import Web3 from 'web3';
import ref from 'vue';
import detectEthereumProvider from "@metamask/detect-provider";
import Trusts from "../build/contracts/Trusts.json";
import store from "./store";
import { round, toEther } from "./helpers";

class TrustService {

    data() {
        return {
            reactive: {
            trustContract: null,
            isConnected: false,
            connectionError: false,
            connectionErrorMessage: "",
            networkId: 0,
            chainId: 0,
            mainAccount: "",
            balance: 0,
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
        console.log('connect');
        this.provider = await detectEthereumProvider();

        if(this.provider) {
            console.log('this.provider', this.provider);

            window.web3 = new Web3(window.ethereum);

            await this.provider.request({method: 'eth_requestAccounts'});
        
            this.chainId = await this.provider.request({ method: 'eth_chainId'});
            const account = await this.provider.request({ method: 'eth_accounts'});
            // console.log("returned", this.chainId, account[0]);
            // Store the connection data, balance, etc
            this.mainAccount = account[0];
            this.balance = await window.web3.eth.getBalance(this.mainAccount);
            this.networkId = await window.web3.eth.net.getId()
            
            const networkData = Trusts.networks[this.networkId]

            if(networkData) {
                try {
                    this.trustContract = new window.web3.eth.Contract(Trusts.abi, networkData.address)
                    this.trustCount = await this.trustContract.methods.getTrustCount().call();
                } catch(err) {
                    console.error("Error Connecting to trustContract: ", err);
                    console.error(this.trustContract, this.trustCount);
                    this.connectionErrorMessage = err;
                    this.connectionError = true;
                    this.isConnected = false;
                    return;
                }

            }
            this.isConnected = true;
 
            console.log("isConnected ", this.isConnected);

            this.provider.on('accountsChanged', this.handleAccountsChanged);
        }
    }
    async init() {

        // Connect to BC
        // TODO : Drop cookie
        this.rememberMe = true;
        if(this.rememberMe)
        {
            console.log("init()")
            this.connect();
        }
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

        if(!this.isConnected)
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
        } else if (accounts[0] !== this.mainAccount) {
            console.log("handleAccountsChanged()", accounts[0])
            this.mainAccount = accounts[0];
            // Do any other work!
        }            
    }
    ETH2USD(eth) {
        if(!this.isConnected)
            return;
        if(!this.exchange) 
            return;
            
        return this.exchange.USD * toEther(eth);
    }
    ETH2USDString(eth) {
        if(!this.isConnected) return;

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
        if(!this.isConnected) return;

        let bal = window.web3.utils.fromWei(this.balance, 'Ether');
        
        if(_length)
            return round(bal);
        else 
            return bal
    
    }
    async refreshBalance() {
        if(!this.isConnected) return;

        this.balance = await window.web3.eth.getBalance(this.mainAccount);
    }
        
}

export default TrustService;
