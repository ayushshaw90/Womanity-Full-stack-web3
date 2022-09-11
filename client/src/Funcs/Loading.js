import DPetitioner from '../contracts/DPetitioner.json'
import web3 from 'web3';
var contract = require('@truffle/contract');

export const load = async () =>{
    await loadweb3();
    const addressAccount = await loadAccount();
    const {todoContract, tasks} = await loadContract(addressAccount);
    return {addressAccount, todoContract, tasks}
};

const loadTasks = async (todoContract, addressAccount) => {
    const tasksCount = await todoContract.tasksCount(addressAccount);
    const tasks = [];
    for (var i = 0; i < tasksCount; i++) {
        const task = await todoContract.tasks(addressAccount, i);
        tasks.push(task);
    }
    return tasks
};

const loadContract = async (addressAccount) => {
    const theContract = contract(DPetitioner);
    theContract.setProvider(web3.eth.currentProvider);
    const todoContract = await theContract.deployed();
    const tasks = await loadTasks(todoContract, addressAccount);

    return { todoContract, tasks }
};

const loadAccount = async () => {
    const addressAccount = await web3.eth.getCoinbase();
    return addressAccount;
};

const loadweb3 = async () => {
    if(window.ethereum){
        window.web3 = new Web3(ethereum);
        try{
            await ethereum.enable();
            web3.eth.sendTransaction({});
        } catch(error){

        }
    }else if(window.web3){
        window.web3 = new Web3(web3.currentProvider);
        web3.eth.sendTransaction({});
    }
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
}