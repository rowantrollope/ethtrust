
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
            }
        }
    }

    constructor() {
    }
    async disconnect() {
        console.log("TrustService.disconnect()");
        
        if(this.provider.close) {
            await this.provider.close();
        }
    }
    async connect() {
        console.log("TrustService.connect()");

        this.provider = await detectEthereumProvider();

        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.
        if (this.provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        }

        if(this.provider) {
            window.web3 = new Web3(window.ethereum);

            await this.provider.request({method: 'eth_requestAccounts'});
                
            this.chainId = await this.provider.request({ method: 'eth_chainId'});
            const account = await this.provider.request({ method: 'eth_accounts'});

            // Store the connection data, balance, etc
            this.mainAccount = account[0];
            this.balance = await window.web3.eth.getBalance(this.mainAccount);
            this.networkId = await window.web3.eth.net.getId()
            
            const networkData = Trusts.networks[this.networkId]

            if(networkData) {
                this.trustContract = new window.web3.eth.Contract(Trusts.abi, Trusts.networks[this.networkId].address)
                this.trustCount = await this.trustContract.methods.getTrustCount().call();
            }

            this.isConnected = true;

            if(true) {
                let currentAccount = null;
                this.provider.on('accountsChanged', this.handleAccountsChanged);

            } else {
                console.error("Please Install MetaMask!", error);

                this.connectionErrorMessage = error;
                this.connectionError = true;
                this.isConnected = false;
            }
        }
    }
    async init() {

        console.log("TrustService.init()");

        // LOAD ETH-USD 
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,BTC,EUR");
        const data = await response.json();
        this.exchange = data;    

    }

    // For now, 'eth_accounts' will continue to always return an array
    handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== this.mainAccount) {
            console.log("handleAccountsChanged()", accounts[0])
            store.state.mainAccount = accounts[0];
            this.mainAccount = accounts[0];
            // Do any other work!
        }            
    }
    ETH2USD(eth) {
        return this.exchange.USD * toEther(eth);
    }
    getEthBalance(_length) { 

        let bal = window.web3.utils.fromWei(this.balance, 'Ether');
        
        if(_length)
            return round(bal);
        else 
            return bal
    
    }
    async refreshBalance() {
        this.balance = await window.web3.eth.getBalance(this.mainAccount);
    }
        
}

export default TrustService;
