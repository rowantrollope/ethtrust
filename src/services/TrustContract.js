/*
    TrustContract.js

    Component used to connect to Trust solidity SmartContract.

*/
import Web3 from 'web3';
import { reactive, watch } from 'vue';
import Trusts from "../../build/contracts/Trusts.json";
import bc from "./Blockchain";

let trustContract = {};

const connected = watch(bc.state.isConnected,
    (connected, prevConnected) => {
        console.log("WATCHER FIRED isConnected");
        if(connected)
            load();
    }
)

const state = reactive({
    isConnected: false,
    connectionError: false,
    connectionErrorMessage: "",
    trustContract: 0,
    trusts: [],
}) 

// Connect to blockchain and contract
const init = async () => {
    const networkData = Trusts.networks[bc.state.networkId]

    if(networkData) {
        try {
            trustContract = await new window.web3.eth.Contract(Trusts.abi, networkData.address)
            state.trustCount = await trustContract.methods.getTrustCount().call();
        } catch(err) {
            
            console.error("Error Connecting to trustContract: ", err);
            console.error(trustContract, state.trustCount);
            
            state.connectionErrorMessage = err;
            state.connectionError= true;
            
            return;
        }
        //console.log("ts.init - Connected");
        state.isConnected = true;
    
        //
        // Register Solidity Event Handlers
        //
        trustContract.events.LogCreateTrust({ fromBlock: 'latest' }, onCreateTrust);
        trustContract.events.LogRemoveTrust({ fromBlock: 'latest' }, onRemoveTrust);
    
        await load();
    }
}

const onRemoveTrust = async (error, event) => {
    
    let key = event.returnValues.key;
    console.log("EVENT: LogRemoveTrust: ", key);
    
    const idx = state.trusts.findIndex(trust => trust.key === key);
    if(idx != -1)
        state.trusts.splice(idx, 1)
    else
        console.error("Can't Find Trust");
} 

const onCreateTrust = async (error, event) => {

    let key = event.returnValues.key;
    console.log("EVENT: LogCreateTrust: ", key, event);
    
    const idx = state.trusts.findIndex(trust => trust.key === key);
    
    // Sometimes this callback is being called twice - only insert once
    if(idx != -1)
    {
        console.error("LogCreateTrust Called Twice", event);
        return;
    }

    let trust = await trustContract.methods.getTrust(event.returnValues.key).call();
    state.trusts.push(trust);
}

const load = async (callback) => {

    if(!bc.state.isConnected)
        return;
    
    if(!state.isConnected) {
        console.log("ts.load() - not loaded yet");
        return;
    }

    let newtrusts = [];

    state.trustCount = await trustContract.methods.getTrustCount().call();
    console.log(`TrustContract.load() - SUCCESS Loading. getTrustCount: ${state.trustCount}`);
    // Load trusts
    for (var i = 0; i <= state.trustCount - 1; i++) {
        const key = await trustContract.methods.getTrustAtIndex(i).call();
        const trust = await trustContract.methods.getTrust(key).call(); 
        if(!callback || callback(trust))
            newtrusts = [...newtrusts, trust];
    }
    //console.log("trusts", newtrusts);
    state.trusts = newtrusts;

    return newtrusts;
}

const createTrust = async (address, trustee, name, date, amount, account) => {
 
    console.log(`CreateTrust: Beneficiary: ${address} Amount: ${amount}, Account: ${account}, Date: ${date}`);
    
    await trustContract.methods.createTrust(address, trustee, name, date)
        .send( {value: amount, from: account });

}
      
const deleteTrust = async (key) => {
    
    await trustContract.methods.withdrawAll(key).send( { from: bc.state.mainAccount } );
    await trustContract.methods.deleteTrust(key).send( { from: bc.state.mainAccount } );
}

const updateTrust = async (key, beneficiary, trustee, name, date, account) => {

    console.log(`UpdateTrust ${key}: Name: ${name}, Date: ${date}, Beneficiary: ${beneficiary}, Account: ${account}`);
    
    await trustContract.methods.updateTrust(key, beneficiary, trustee, name, date)
        .send( { from: account });
    
    await _updateTrust(key);
}

const _updateTrust = async (key) => {

    let index = state.trusts.findIndex(trust => trust.key === key);

    let newTrust = await trustContract.methods.getTrust(key).call();
    
    state.trusts[index] = newTrust;
}

const withdraw = async (key, amount, account) => {

    console.log(`withdraw() ${key}: ${amount}, Account: ${account}`);
   
    await trustContract.methods.withdraw(key, amount)
        .send( { from: account });

    await _updateTrust(key);
}

const deposit = async (key, amount, account) => {

    console.log(`deposit() ${key}: ${amount}, Account: ${account}`);

    await trustContract.methods.depositTrust(key)
        .send( {value: amount.toString(), from: account });
    
    await _updateTrust(key);
}

export default {
    state,
    init,
    load,
    createTrust,
    deleteTrust,
    updateTrust,
    withdraw,
    deposit,
}
