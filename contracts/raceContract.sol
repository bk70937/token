// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./SafeMath.sol";

interface Token {
    function transferFrom(address, address, uint256) external returns (bool) ;
    function transfer(address, uint256) external returns (bool) ;
}

contract RaceGame {
    
    using SafeMath for uint256;
    
    struct Race 
    {
        address owner;
        uint256 entryFee;
        uint256 status;
    }
    
    address public token ;
    
    mapping(uint256 => Race) raceMap;
    uint256[] public races;
    mapping (uint256 => bool) raceExist;
    mapping (address => mapping(uint256 => uint256)) raceBoard;
    uint256 winningPercentage = 50 ;
    
    function raceStart (uint256 _amount) public {
        
        uint256 raceId = races.length;

        require(_amount > 0, "Error Message");
        require(!raceExist[raceId] , "Already Exist");
        // uint256 raceId = races.length;
        raceExist[raceId] = true;
        races.push(raceId); 
        raceMap[raceId].owner = msg.sender;
        raceMap[raceId].entryFee = _amount;
        Token(token).transferFrom(msg.sender, address(this), _amount);
    }
    
    function raceOver (uint256 _status, uint256 _raceId) public {

        require(raceMap[_raceId].status == 0, "Game not in Progress") ;
        raceMap[_raceId].status = _status ;
        raceMap[_raceId].owner = msg.sender;

        if(_status == 1) {
            
            uint256 winningAmount = winningPercentage*raceMap[_raceId].entryFee/100 ;
            raceBoard[msg.sender][block.timestamp] = raceMap[_raceId].entryFee.add(winningAmount) ;
            Token(token).transfer(raceMap[_raceId].owner, winningAmount) ;
            
        }

    }
    
    
}