import Web3 from 'web3';
import { ref, reactive } from 'vue';
import Trusts from "../../build/contracts/Trusts.json";
import bc from "../blockchain";

let trustContract = {};

const state = reactive({
    isConnected: false,
    connectionError: false,
    connectionErrorMessage: "",
    trustContract: 0,
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
        console.log("ts.init - Connected");
        state.isConnected = true;
    }
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
    console.log("trustCount", state.trustCount);
    // Load trusts
    for (var i = 0; i <= state.trustCount - 1; i++) {
        const key = await trustContract.methods.getTrustAtIndex(i).call();
        const trust = await trustContract.methods.getTrust(key).call(); 
        if(!callback || callback(trust))
            newtrusts = [...newtrusts, trust];
    }
    console.log("trusts", newtrusts);
    
    return newtrusts;
}

const createTrust = async (address, trustee, name, date, amount, account) => {
 
    console.log(`CreateTrust: Amount: ${amount}, Account: ${bc.state.mainAccount}`);
    
    await trustContract.methods.createTrust(address, trustee, name, date)
        .send( {value: amount.toString(), from: account });
   
}
      
const deleteTrust = async (key) => {
    
    await trustContract.methods.withdrawAll(key).send( { from: bc.state.mainAccount } );
    await trustContract.methods.deleteTrust(key).send( { from: bc.state.mainAccount } );

}

const updateTrust = async (key, beneficiary, name, date, account) => {

    console.log(`UpdateTrust ${key}: Name: ${name}, Date: ${date}, Beneficiary: ${beneficiary}, Account: ${account}`);
    
    await trustContract.methods.updateTrust(key, beneficiary, name, date)
        .send( { from: account });

}

const withdraw = async (key, amount, account) => {

    console.log(`withdraw() ${key}: ${amount}, Account: ${account}`);
   
    await trustContract.methods.withdraw(key, amount)
        .send( { from: account });
}

const deposit = async (key, amount, account) => {

    console.log(`deposit() ${key}: ${amount}, Account: ${account}`);

    await trustContract.methods.depositTrust(key)
        .send( {value: amount.toString(), from: account });

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
