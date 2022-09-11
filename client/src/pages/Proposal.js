// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import downvote from "../images/downvote.png";
import upvote from "../images/correct.png"
import "./pages.css";
import { Tag, Widget, Tooltip, Form, Table, Avatar } from "@web3uikit/core";
// import {Icon} from "@web3uikit/icons"
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import back from "../images/left-chevron.png"

const Proposal = ({account, contract, id}) => {
  let tempid=id;
  const [load, setLoad] = useState(true);
  const { state: proposalDetails } = useLocation();
  const [exists, setExists] = useState("false");
  const [passed, setPassed] = useState("true");
  const [pname, setpname] = useState("Random name")
  const [upvotes, setupvotes] = useState(10);
  const [downvotes, setdownvotes] = useState(30);
  const [proposer, setProposer] = useState("0x4d2044D8D568c1644158625930De62c4AbBB004a")
  console.log("proposal contract", contract)
  async function fetchProposal(){
    if(!contract) return;
    let tempProposal = await contract.methods.Proposals(tempid).call()
    if(pname!== tempProposal.title)
    setpname(tempProposal.title)
    if(tempProposal.upvotes != upvotes)
    setupvotes(tempProposal.upvotes);

    if(downvotes != tempProposal.downvotes)
    setdownvotes(tempProposal.downvotes);
    console.log("tempProposal", tempProposal)

    if(exists !== tempProposal.exists){
      setExists(tempProposal.exists);
    }
    if(passed !== tempProposal.passed){
      setPassed(tempProposal.passed);
    }
  }
  useEffect( ()=>{

    fetchProposal().then(e=>1)
  }, [])
  async function castvote(upvote){
    console.log("voted func", upvote)
    if(contract && account){
      await contract.methods.castVote(tempid, upvote).send({from: account})
    }
  }
  const [votes, setVotes] = useState(

[
  [
    "0x4d2044D8D568c1644158625930De62c4AbBB004a",
    <img src={upvote} style={{height: "32px"}} />,
  ],
  [
    "0x4d2044D8D568c1644158625930De62c4AbBB004a",
    <img src={upvote} style={{height: "32px"}} />,
  ],
  [
    "0x4d2044D8D568c1644158625930De62c4AbBB004a",
    <img src={downvote} style={{height: "32px"}} />,
  ],
  [
    "0x4d2044D8D568c1644158625930De62c4AbBB004a",
    <img src={downvote} style={{height: "32px"}} />,
  ],
  [
    "0x4d2044D8D568c1644158625930De62c4AbBB004a",
    <img src={downvote} style={{height: "32px"}} />,
  ],
]
  );
  const [sub, setSub] = useState(false);
  return (
    <>
      <div className="contentProposal">
        <div className="proposal">
          <Link to="/">
            <div className="backHome">
              <img src={back} style={{height: "16px"}}></img>
              {/* <Metamask fill="#ffffff" size={20} svg="chevronLeft" /> */}
              Overview
            </div>
          </Link>
          <div>{pname}</div>
          <div className="proposalOverview">
            <Tag color={exists? "blue": (passed? "green": "red")} text={exists? "Ongoing":(passed ? "Passed": "Rejected")} />
            <div className="proposer" style={{display: "flex", flexDirection: "column"}}>
              <span>Proposed By</span>
              <span>{proposer}</span>
            </div>
          </div>
        </div>
        <div className="widgets">
          <Widget info={upvotes} title="Votes For">
            <div className="extraWidgetInfo">
              <div className="extraTitle">{(upvotes==0 && downvotes==0)?0:((parseInt(upvotes)*100)/(parseInt(upvotes)+parseInt(downvotes)))}%</div>
              <div className="progress">
                <div className="progressPercentage" style={{width: `${(upvotes==0 && downvotes==0)?0:((parseInt(upvotes)*100)/(parseInt(upvotes)+parseInt(downvotes)))}%`}}></div>
              </div>
            </div>
          </Widget>
          <Widget info={downvotes} title="Votes Against">
            <div className="extraWidgetInfo">
              <div className="extraTitle">{(upvotes==0 && downvotes==0)?0:((parseInt(upvotes)*100)/(parseInt(upvotes)+parseInt(downvotes)))}%</div>
              <div className="progress">
                <div className="progressPercentage" style={{width: `${(upvotes==0 && downvotes==0)?0:((parseInt(upvotes)*100)/(parseInt(upvotes)+parseInt(downvotes)))}%`}}></div>
              </div>
            </div>
          </Widget>
        </div>
        <div className="votesDiv">
          <Table
          style={{width: "50%"}}
          columnsConfig= "90% 10%"
          data={votes}
          header={[<span>Address</span>, <span>Vote</span>]}
          pageSize={5}
          />

          <Form style={{
            width: "35%",
            height: "250px",
            border: "1px solid rgba(6, 158, 252, 0.2)",
          }}
          bottomConfig={{
            isLoading: false,
            loadingText: "Casting Vote",
            text: "Vote",
            theme: "secondary",
          }}
          data={[
            {
              inputWidth: "100%",
              name: "Cast Vote",
              options: ["For", "Against"],
              type: "radios",
              validation: {
                required: true,
              }
            }
          ]}
          onSubmit={async (e)=> {
            setLoad(!load);
            alert("Vote cast");
            console.log("vote option", e.data[0].inputResult[0])
            let tempop = e.data[0].inputResult[0];
            if(tempop==="For"){
              await castvote(true)
              console.log("voted value", tempop)
            }else{
              await castvote(false)
              console.log("voted value", tempop)
            }
            await fetchProposal()
            
          }}
          title="Cast Vote"
          />
        </div>
        
      </div>
      <div className="voting"></div>
    </>
  );
};

export default Proposal;