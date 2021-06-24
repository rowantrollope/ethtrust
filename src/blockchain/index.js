import { reactive, computed } from 'vue'
import Web3 from 'web3';
import detectEthereumProvider from "@metamask/detect-provider";

const state = reactive({
    isConnected: false,
    connectionError: false,
    connectionErrorMessage: "",
    networkId: 0,
    chainId: 0,
    mainAccount: "",
    balance: "0",
    provider: {},
}) 

// Connect to blockchain and contract
const connect = async () => {
    console.log('connect');
    state.provider = await detectEthereumProvider();
    if(state.provider) {
        console.log('state.provider', state.provider);

        window.web3 = new Web3(window.ethereum);

        await state.provider.request({method: 'eth_requestAccounts'});
    
        state.chainId = await state.provider.request({ method: 'eth_chainId'});
        const account = await state.provider.request({ method: 'eth_accounts'});

        // Store the connection data, balance, etc
        state.mainAccount = account[0];
        state.balance = await window.web3.eth.getBalance(state.mainAccount);
        state.networkId = await window.web3.eth.net.getId()
        
        state.isConnected = true;
        
        console.log("isConnected ", state.isConnected);
        
        state.provider.on('accountsChanged', accountsChanged);
    }
}

const accountsChanged = (accounts) => {
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
        state.isConnected = false;
        state.mainAccount = accounts[0];
    } else if (accounts[0] !== state.mainAccount) {
        console.log("handleAccountsChanged()", accounts[0])
        state.mainAccount = accounts[0];
        // Do any other work!
    }            
}

const etherBalance = computed(() => { return state.isConnected ? window.web3.utils.fromWei(state.balance, 'Ether') : 0; });

const refreshBalance = async () => {
    if(!state.isConnected) 
        return;

    state.balance = await window.web3.eth.getBalance(state.mainAccount);
}

export default {
    state,
    connect,
    etherBalance,
    refreshBalance
}