// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DPetitioner{
    string public name;
    address public owner;
    enum Gender {Male, Female, Other}
    uint256 nextProposal;
    uint256 public totalVoters;
    uint256 public ongoingProposals;
    //Stores info about accountholders
    struct AccountInfo{
        address account;
        string firstName;
        string lastName;
        Gender gender;
    }

    mapping(address => AccountInfo) public voters;
    
    struct proposal{
        uint256 id;
        address creator;
        bool exists;
        string title;
        uint deadline;
        uint upvotes;
        uint downvotes;
        bool passed;
        mapping(address => bool) voted;
    }
    mapping(uint256 => proposal) public Proposals;

    constructor(){
        totalVoters = 0;
        name = "DPetitioner";
        owner = msg.sender;
        nextProposal = 1;
    }
    function getTotalNumberOfProposals() public view returns(uint256){
        return(nextProposal -1);
    }
    function addVoter(address _newVoter, string memory _fname, string memory _lname, Gender _gender) public returns(bool){
        // require(msg.sender == owner);
        require(_newVoter != address(0), "Address cannot be 0x0");
        require(_gender <= Gender.Other, "Invalid gender option");
        require(voters[_newVoter].account == address(0), "Voter already exists");
        AccountInfo storage acc = voters[_newVoter];
        acc.account = _newVoter;
        acc.firstName = _fname;
        acc.lastName = _lname;
        acc.gender = _gender;
        totalVoters++;
        return true;
    }
    function totalProposalsCreated() public view returns(uint256){
        return( nextProposal-1);
    }
    function addProposal(string memory _title) public returns(uint256){
        require(voters[msg.sender].account != address(0), "Address cannot be zero");
        proposal storage newProposal = Proposals[nextProposal];
        newProposal.id = nextProposal;
        newProposal.creator = msg.sender;
        newProposal.exists = true;
        newProposal.title = _title;
        newProposal.upvotes = 0;
        newProposal.downvotes = 0;
        newProposal.passed = false;
        
        nextProposal++;
        ongoingProposals++;
        return (nextProposal -1);
    }
    function hasVoted(uint256 _id, address sender) public view returns(bool){
        require(_id < nextProposal && _id>0, "This ID does not exist");
        if(Proposals[_id].voted[sender]){
            return true;
        }else{
            return false;
        }
    }
    function castVote(uint256 _id, bool upvote) public{
        require(_id<nextProposal && _id>0, "ID does not exist");
        require(Proposals[_id].exists, "Proposal not active");
        require(!(hasVoted(_id, msg.sender)), "Cannot vote twice");
        require(voters[msg.sender].account != address(0), "Address cannot be zero");
        Proposals[_id].voted[msg.sender] = true;
        if(upvote){
            Proposals[_id].upvotes += 1;
        }else{
            Proposals[_id].downvotes += 1;
        }
    }
    function calculatePetitionResult(uint256 _id) public returns(bool){
        require(_id>0 && _id<nextProposal);
        require(Proposals[_id].exists);
        if(Proposals[_id].upvotes > Proposals[_id].downvotes){
            Proposals[_id].passed = true;
        }else{
            Proposals[_id].passed = false;
        }
        Proposals[_id].exists = false;
        ongoingProposals--;
        return Proposals[_id].passed;
    }
    function checkResultById(uint _id) public view returns(bool){
        require(_id>0 && _id<nextProposal);
        return Proposals[_id].passed;
    }
    event ProposalCreated(
        uint256 total
    );
    event ProposalCount(
        uint256 id,
        bool passed
    );
    event newVote(
        uint256 upvotes,
        uint256 downvotes,
        address voter,
        uint256 proposalId
    );
}