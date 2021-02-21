pragma solidity 0.7.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";


// The BigBoardz DAO contract
// This contract must:
// create boards for hosts
// allow hosts to request fresh scores
contract BigBoardz is AccessControl, ChainlinkClient{
    
    // games (mapping gameIds -> gameDataobject)
    address[] openBoardz;
    address[] abandonedBoardz;
    address[] soldOutBoardz;
    address[] completeBoardz; // (game is over, winners were paid and profits were collected.)

    constructor() public {
        // set hostToken
    }
    /**
     * Withdraw LINK from this contract
     * 
     * DO NOT USE THIS IN PRODUCTION AS IT CAN BE CALLED BY ANY ADDRESS.
     * THIS IS PURELY FOR EXAMPLE PURPOSES.
     */
    /* function withdrawLink() external {
        require(LINK.transfer(msg.sender, LINK.balanceOf(address(this))), "Unable to transfer");
    } */
}