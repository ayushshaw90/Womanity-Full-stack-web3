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

const Proposal = () => {
  const { state: proposalDetails } = useLocation();
  const [latestVote, setLatestVote] = useState();
  const [percUp, setPercUp] = useState(0);
  const [percDown, setPercDown] = useState(0);
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
          <div>Should we accept Elon Musks $44Billion offer for our DAO</div>
          <div className="proposalOverview">
            <Tag color={"red"} text={"Rejected"} />
            <div className="proposer" style={{display: "flex", flexDirection: "column"}}>
              <span>Proposed By</span>
              <span>0x847528dddF11BF87A8837642E4cE8533f02ac9EA</span>
            </div>
          </div>
        </div>
        <div className="widgets">
          <Widget info={10} title="Votes For">
            <div className="extraWidgetInfo">
              <div className="extraTitle">{25}%</div>
              <div className="progress">
                <div className="progressPercentage" style={{width: `${25}%`}}></div>
              </div>
            </div>
          </Widget>
          <Widget info={30} title="Votes Against">
            <div className="extraWidgetInfo">
              <div className="extraTitle">{75}%</div>
              <div className="progress">
                <div className="progressPercentage" style={{width: `${75}%`}}></div>
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
          onSubmit={(e)=> {
            alert("Vote cast");
          }}
          title="Cast Vote"
          />
        </div>
        {/* <div className="proposal">
              <Link to="/">
                <div className="backHome">
                  <Icon fill="#ffffff" size={20} svg="chevronLeft" />
                  Overview
                </div>
              </Link>
              <div>{proposalDetails.description}</div>
              <div className="proposalOverview">
                <Tag color={proposalDetails.color} text={proposalDetails.text} />
                <div className="proposer">
                  <span>Proposed By </span>
                  <Tooltip content={proposalDetails.proposer}>
                    <Blockie seed={proposalDetails.proposer} />
                  </Tooltip>
                </div>
              </div>
            </div>
            {latestVote && (
            <div className="widgets">
              <Widget info={latestVote.votesUp} title="Votes For">
                <div className="extraWidgetInfo">
                  <div className="extraTitle">{percUp}%</div>
                  <div className="progress">
                    <div
                      className="progressPercentage"
                      style={{ width: `${percUp}%` }}
                    ></div>
                  </div>
                </div>
              </Widget>
              <Widget info={latestVote.votesDown} title="Votes Against">
            <div className="extraWidgetInfo">
              <div className="extraTitle">{percDown}%</div>
              <div className="progress">
                <div
                  className="progressPercentage"
                  style={{ width: `${percDown}%` }}
                ></div>
              </div>
            </div>
          </Widget>
        </div>
        )}
        <div className="votesDiv">
          <Table
            style={{ width: "60%" }}
            columnsConfig="90% 10%"
            data={votes}
            header={[<span>Address</span>, <span>Vote</span>]}
            pageSize={5}
          />
<Form
            isDisabled={proposalDetails.text !== "Ongoing"}
            style={{
              width: "35%",
              height: "250px",
              border: "1px solid rgba(6, 158, 252, 0.2)",
            }}
            buttonConfig={{
              isLoading: sub,
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
                },
              },
            ]}
            onSubmit={(e) => {
            //     return;
            //   if (e.data[0].inputResult[0] === "For") {
            //     castVote(true);
            //   } else {
            //     castVote(false);
            //   }
            //   setSub(true);
            }}
            title="Cast Vote"
          />
          </div>*/}
      </div>
      <div className="voting"></div>
    </>
  );
};

export default Proposal;