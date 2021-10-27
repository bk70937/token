// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// racestart - owner address, raceid, timestamp, status, amount - input
// recewinner - winner address, winner id, winning amount

contract RaceGame {
    
    struct Race 
    {
        address owner;
        uint256 entryFee;
        uint256 status;
    }
    
    mapping(uint256 => Race) raceMap;
    uint256[] public races;
    mapping (uint256 => bool) raceExist;
    mapping (address => mapping(uint256 => uint256)) raceBoard;
    uint256 winningPercentage = 50 ;
    
    function raceStart (uint256 _amount) public {
        
        uint256 raceId = races.length;
        uint256 _status = raceMap[raceId].status;
        
        require(_amount > 0, "Error Message");
        require(_status == 1, "Race Start Successfully");
        require(!raceExist[raceId] , "Already Exist");
        // uint256 raceId = races.length;
        raceExist[raceId] = true;
        races.push(raceId); 
        // raceMap[raceId] = 
        raceMap[raceId].owner = msg.sender;
        raceMap[raceId].entryFee = _amount;
        
    }
    
    function raceOver (uint256 _status, uint256 _raceId) public {
        // if status == 1 else status == 2(winner)

        require(raceMap[_raceId].status == 0, "Game not in Progress");
        raceMap[_raceId].status = _status ;
        
        if(_status == 1) {
            raceBoard[msg.sender][block.timestamp] = raceMap[_raceId].entryFee + winningPercentage;
        }
    }
    
}