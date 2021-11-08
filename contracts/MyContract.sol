// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 < 0.9.0;

// ownerable
// safemath

import "./SafeMath.sol";

interface Token {
    function transferFrom(address,address,uint256) external returns (bool) ;    
    function transfer(address,uint256) external returns (bool) ;    
    function balanceOf(address) external view returns (uint256) ;    
    function symbol() external returns (string calldata) ;    
    function decimals() external returns (uint256) ;    
}

contract MyContract
{
    using SafeMath for uint256;
    
    address private wallet_address;
  
    // constructor(address _token) public {   
    //     token = _token;
    // }
    
    struct Match 
    {
        address owner;
        uint256 entryFee;
        uint256 status;
        address winner;
        mapping(address => bool) members;
    }
    
    address public token = 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee;

    mapping (uint256 => Match) matchesMap;
    mapping (uint256 => uint256) poolCollection;
    mapping (address => uint256) userReward;
    uint256[] public matches;
    mapping (uint256 => bool) matchExist;
  
    function createMatch(uint256 matchId ,  uint256 _amount) public {
        require(_amount > 0, "error message");
        require(!matchExist[matchId] , "Already Exist") ;
        matchExist[matchId] = true ;
        matches.push(matchId) ;
        // Match storage _match ;
        // _match.owner = msg.sender ;
        // _match.entryFee = _amount ;
        // _match.members[msg.sender] = true ;
        // matchesMap[matchId] = _match ;
        // Token(token).transferFrom(msg.sender,address(this),_amount) ;
        poolCollection[matchId] = poolCollection[matchId].add( _amount) ;
    }
    
    function joinMatch(uint256 matchId) public {
        require(matchExist[matchId] , "Doesn't Exist") ;
        require(!matchesMap[matchId].members[msg.sender] , "Already Member") ;
        matchesMap[matchId].members[msg.sender] = true ;
        Token(token).transferFrom(msg.sender,address(this),matchesMap[matchId].entryFee);
        poolCollection[matchId] = poolCollection[matchId].add(matchesMap[matchId].entryFee) ;
    }
    
    function startMatch(address [] memory _myAddress, uint256 matchId, uint256 _amount, uint256 _status) public {
        require(_myAddress.length != 0, "error message") ;
        require(_amount > 0, "error message") ;
        require(_status == 1, "Match Start Successfully") ;
        require(!matchExist[matchId] , "Already Exist") ;
        matchExist[matchId] = true ;
        matches.push(matchId) ;
        for(uint256 i = 0 ; i < _myAddress.length ; i++) {
            matchesMap[matchId].members[_myAddress[i]] = true ;
        }
        
    }
    
    function playerleaves(uint256 matchId) public {
        require(!matchExist[matchId], "Already Exist") ;
        matchExist[matchId] = true ;
        matchesMap[matchId].members[msg.sender] = false ; 
        Token(token).transfer(msg.sender,matchesMap[matchId].entryFee);
        poolCollection[matchId] = poolCollection[matchId].sub(matchesMap[matchId].entryFee) ;
    }
    
    
    function endGame(address  _winner, uint256 _matchId) public  {
        require(matchesMap[_matchId].status == 1, "Game not in Progress");
        matchesMap[_matchId].winner = _winner ;
        matchesMap[_matchId].status = 2 ;
        userReward[_winner] = userReward[_winner].add(poolCollection[_matchId]) ;
    }
    
    function claim() public  {
        Token(token).transfer(msg.sender,userReward[msg.sender]);
    }
    
    function getBalance() public view returns (uint256) {
        uint256 balance = Token(token).balanceOf(msg.sender);
        return balance;
    }
    
    function getReward() public view returns (uint256) {
        return userReward[msg.sender];
    }
    
}