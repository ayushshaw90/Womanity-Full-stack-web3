

import DPetitionerJson from './contracts/DPetitioner.json'
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Proposal from "./pages/Proposal";
import Logo from "./images/Moralis.png";
import { Button } from "@web3uikit/core";
import { useState, useEffect } from "react";
import Web3 from "web3";

const App = () => {
  const [eligibleVoters, setEligibleVoters] = useState(423);
  const [ongoing, setongoing] = useState(5);
  const [totalProposals, setTotalProposal] = useState(52);
  const [username, setusername] = useState("user")
  const [account, setAccount] = useState("0x0")
  const [loading, setLoading] = useState(true);
  const [DPetitioner, setDPetitioner] = useState(null);
  const [proposalData, setProposalData] = useState(
    [
    {
      id: 4,
      title: "Should we start a Moralis hamburger chain",
      color: "green",
      text: "Passed"
    },
    {
      id: 3,
      title: "Should we accept $44 billion for our dao",
      color: "green",
      text: "Passed"
    },
    { id: 2,
      title: "Should we start a Moralis egg roll chain",
      color: "blue",
      text: "Ongoing"
    },
    { id: 1,
      title: "Should we start a Moralis pizza chain",
      color: "green",
      text: "Passed"
    }
  ]
  )
  var acctemp = account;
  async function loadWeb3(){

    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      window.ethereum.on("accountsChanged", (accounts)=> {
        if(accounts.length>0){
          console.log("account set")
          setAccount(accounts[0])
        }
      })
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }else{
      window.alert('Non-Ethereum browser detected. You should consider trying Metamask!')
    }
  }
  async function  loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    acctemp = accounts[0];
    const networkId = await web3.eth.net.getId();

    const DPetitionerData = DPetitionerJson.networks[networkId]
    if(DPetitionerData){
      console.log("DPetitioner data if statement")
      const tempContract = new web3.eth.Contract(DPetitionerJson.abi, DPetitionerData.address)
      setDPetitioner(tempContract);
      console.log("contract", tempContract)
      var usertemp = "";
      usertemp=(await tempContract.methods.voters(acctemp).call({from: acctemp})).firstName;
      console.log("usertemp",usertemp)
      setusername(usertemp)

      var total = await tempContract.methods.getTotalNumberOfProposals().call();
      console.log("total", total);
      setTotalProposal(total)

      let proposalparam = [];
      for(let i=total;i>=1;i--){
        let ttmp = await tempContract.methods.Proposals(i).call();
        let tttmp = {
          id: `${i}`, 
          title: ttmp.title,
          text: "",
          color: "green"
        }
        if(ttmp.exists){
          tttmp.text = "Ongoing"
          tttmp.color = "blue"
        }else{
          if(ttmp.passed){
            tttmp.text = "Passed",
            tttmp.color = "green"
          }else{
            tttmp.text = "Rejected"
            tttmp.color = "red"
          }
        }
        // console.log(ttmp)
        proposalparam.push(tttmp)
      }
      console.log("proposalparam", proposalparam)
      setProposalData(proposalparam)
      var votersparam = await tempContract.methods.totalVoters().call();
      console.log("votersparam", votersparam)
      setEligibleVoters(votersparam)

      var ongoingparam = await tempContract.methods.ongoingProposals().call();
      console.log("ongoingparam", ongoingparam)
      setongoing(ongoingparam)

      if(usertemp===""){
        console.log(tempContract.methods.addVoter(acctemp, "Ayush", "Shaw", 0).send({from: acctemp}));
        setusername("Ayush")
        usertemp = "Ayush"
      }
      
      console.log(await tempContract.methods.name().call())
    }else{
      window.alert('DPetitioner contract not deployed to detected network.')
    }

    console.log(accounts)
  }
  useEffect(()=>{
    // alert("Welcome")
    loadWeb3().then(async (E)=>{
      await loadBlockchainData();
      setLoading(false)
    })
    
  }, [])

  return (
    <>
    <h1>Hello World</h1>
    <h2>{account}</h2>
    
      <div className="header">
        <img width="160px" src={Logo} alt="logo" />
        <Button text={username}/>
      </div>
      {/* <Home></Home> */}
      <Routes>
        {account && <Route path="/" element={<Home contract={DPetitioner} account={account} totalProposals={totalProposals} eligibleVoters={eligibleVoters} ongoing={ongoing} proposalsdata={proposalData} />}  />}
        <Route path="/proposal" element={<Proposal />} />
      </Routes>
    </>
  );
};

export default App;