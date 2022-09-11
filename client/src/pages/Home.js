// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import "./pages.css";
import { Link } from "react-router-dom"
import { TabList, Tab, Widget, Tag, Table, Form } from "@web3uikit/core";
// import { Link } from "react-router-dom";

const Home = ({contract, account, totalProposals, eligibleVoters, ongoing, proposalsdata, passrate, setid}) => {
  // const [totalProposals, setTotalProposal] = useState(52);
  // const [eligibleVoters, setEligibleVoters] = useState(423);
  // const [ongoing, setongoing] = useState(5);
  // useEffect(()=>{
  //   if(contract){
  //   var proposalParam = contract.methods.getTotalNumberOfProposals().call({from: account})
  //   console.log("proposalParam", proposalParam)
  //   }
  // }, [])
  // const [proposals, setProposals] = useState(
    let proposals = [
      [
        1,
        <div>Should we start a Moralis hamburger chain?</div>,
        <Tag color="green" text="Passed" />,
      ],
      [
        2,
        "Should we accept Elon Musks $44billion offer for our DAO?",
        <Link to="/proposal" state={"hello"}>
          <Tag color="red" text="Rejected" />
        </Link>,
      ],
      [
        3,
        "Do you want a Web3 Slack tutorial?",
        <Tag color="blue" text="Ongoing" />,
      ],
      [
        4,
        "Are you interested in Xbox/Console web3 tutorials?",
        <Tag color="blue" text="Ongoing" />,
      ],
      [
        5,
        "Would you attend a Moralis Builder get together in Miami?",
        <Tag color="blue" text="Ongoing" />,
      ],
    ]
  // )
  
    proposals = [...(proposalsdata.map((e)=>{
      let arr = [];
      arr[0]=e.id;
      arr[1]=e.title;
      arr[2]=<button onClick={(ex)=>{setid(e.id)}}><Link to="/proposal"><Tag color={e.color} text={e.text}/></Link></button>
      return(
        arr
      )
    }))]
    console.log("proposals", proposals)
  
  
  return (
    <>
      <div className="content">
        <TabList defaultActiveKey={1} tabStyle="bulbUnion">
          <Tab tabKey={1} tabName="DAO">
            <div className="tabContent">
              Governance Overview
              <div className="widgets">
                <Widget
                  info={totalProposals}
                  title="Proposals Created"
                  style={{ width: "200%" }}
                >
                  <div className="extraWidgetInfo">
                    <div className="extraTitle">Pass Rate</div>
                    <div className="progress">
                      <div className="progressPercentage" style={{ width: `${passrate}%` }}>
                      </div>
                    </div>
                  </div>
                </Widget>
                <Widget info={eligibleVoters} title="Eligible Voters" />
                <Widget info={ongoing} title="Ongoing Proposals" />
              </div>
              <div style={{ marginTop: "30px" }}>
                Recent Proposals
                <Table
                  columnsConfig="10% 70% 20%"
                  data={proposals}
                  header={[
                    <span>ID</span>,
                    <span>Description</span>,
                    <span>Status</span>,
                  ]}
                  pageSize={5}
                />
              </div>
              <Form
                buttonConfig={{
                  isLoading: false,
                  loadingText: "Submitting Proposal",
                  text: "Submit",
                  theme: "secondary"
                }}
                data={[
                  {
                    inputWidth: "100%",
                    name: "New Proposal",
                    type: "textarea",
                    validation: {
                      required: true,
                    },
                    value: "",

                  },
                ]}
                onSubmit={(e) => {
                  console.log(e["data"][0]["inputResult"])
                  console.log(contract)
                  console.log("account", account)
                  try{
                  contract.methods.addProposal(e["data"][0]["inputResult"]).send({from: account})
                  }catch(e){
                    console.log(e)
                  }
                }}
                title="Create a New Proposal"
              />
            </div>
          </Tab>
          <Tab tabKey={2} tabName="Forum"></Tab>
          <Tab tabKey={3} tabName="Docs"></Tab>
        </TabList>
      </div>
      <div className="voting"></div>
    </>
  )




  //   const [passRate, setPassRate] = useState(0);
  // const [totalP, setTotalP] = useState(0);
  // const [counted, setCounted] = useState(0);
  // const [voters, setVoters] = useState(0);

  // const [proposals, setProposals] = useState();
  // const [sub, setSub] = useState();
  // useEffect(()=>{

  // })

  // return(
  //   <>
  //     <div className="content">
  //       <TabList defaultActiveKey={1} tabStyle="bulbUnion">
  //         <Tab tabKey={1} tabName="DAO">
  //           {proposals && (
  //           <div className="tabContent">
  //             Governance Overview
  //             <div className="widgets">
  //               <Widget
  //                 info={totalP}
  //                 title="Proposals Created"
  //                 style={{ width: "200%" }}
  //               >
  //                 <div className="extraWidgetInfo">
  //                   <div className="extraTitle">Pass Rate</div>
  //                   <div className="progress">
  //                     <div
  //                       className="progressPercentage"
  //                       style={{ width: `${passRate}%` }}
  //                     ></div>
  //                   </div>
  //                 </div>
  //               </Widget>
  //               <Widget info={voters.length} title="Eligible Voters" />
  //               <Widget info={totalP-counted} title="Ongoing Proposals" />
  //             </div>
  //             Recent Proposals
  //             <div style={{ marginTop: "30px" }}>
  //               <Table
  //                 columnsConfig="10% 70% 20%"
  //                 data={proposals}
  //                 header={[
  //                   <span>ID</span>,
  //                   <span>Description</span>,
  //                   <span>Status</span>,
  //                 ]}
  //                 pageSize={5}
  //               />
  //             </div>

  //             <Form
  //                 buttonConfig={{
  //                   isLoading: sub,
  //                   loadingText: "Submitting Proposal",
  //                   text: "Submit",
  //                   theme: "secondary",
  //                 }}
  //                 data={[
  //                   {
  //                     inputWidth: "100%",
  //                     name: "New Proposal",
  //                     type: "textarea",
  //                     validation: {
  //                       required: true,
  //                     },
  //                     value: "",
  //                   },
  //                 ]}
  //                 onSubmit={(e) => {
  //                    //added for testing
  //                   // setSub(true);
  //                   // createProposal(e.data[0].inputResult);
  //                 }}
  //                 title="Create a New Proposal"
  //               />


  //           </div>
  //           )}
  //         </Tab>
  //         <Tab tabKey={2} tabName="Forum"></Tab>
  //         <Tab tabKey={3} tabName="Docs"></Tab>
  //       </TabList>
  //     </div>
  //     <div className="voting"></div>
  //   </>
  // )
}

export default Home;