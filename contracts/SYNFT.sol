// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SYNFT is ERC721("Sooyoung NFT", "SYNFT") {

    address immutable owner;
    uint totalSupply;

    constructor(){
        owner = msg.sender;
    }

    function mint(address to) external returns (uint id) {
        require(msg.sender == owner, "!MINT:NOT_OWNER");
        id = totalSupply++;
        _mint(to, id);
    }
}