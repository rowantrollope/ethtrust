
import Web3 from 'web3';
import detectEthereumProvider from "@metamask/detect-provider";
import Trusts from "../build/contracts/Trusts.json";
import store from "./store";

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
            }
        }
    }
    constructor() {
        /*this.trustContract = null;
        this.isConnected = false;
        this.connectionError = false;
        this.connectionErrorMessage = "";
        this.networkId = 0;
        this.chainId = 0;
        this.mainAccount = null;
        this.balance = 0;*/
    }

    async init() {

        const provider = await detectEthereumProvider();

        if(provider) {
            console.log("TrustService.init()");
            // provider === window.ethereum
            window.web3 = new Web3(window.ethereum);
            
            await provider.request({method: 'eth_requestAccounts'});
            
            this.chainId = await provider.request({ method: 'eth_chainId'});
            const account = await provider.request({ method: 'eth_accounts'});

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

        } else {
            console.error("Please Install MetaMask!", error);

            this.connectionErrorMessage = error;
            this.connectionError = true;
            this.isConnected = false;
        }
    }

    getEthBalance(_length) { 
        let bal = window.web3.utils.fromWei(this.balance, 'Ether');
        
        if(_length)
            return bal.substring(0, _length);
        else 
            return bal
    
    }
    async refreshBalance() {
        this.balance = await window.web3.eth.getBalance(this.mainAccount);
    }
}

export default TrustService;
