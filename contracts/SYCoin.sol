// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./SYNFT.sol";

contract SYCoin is ERC20("SYCoin", "SYC") {
    address immutable public owner;
    SYNFT immutable public nft;
    uint fund;

    event Lucky(address indexed from, bool success, uint reward, uint tokenId);

    constructor() {
        owner = msg.sender;
        bytes32 salt = keccak256(abi.encodePacked(msg.sender));
        nft = new SYNFT{salt: salt}();
    }

    function mint() external payable {
        require(balanceOf(msg.sender) < 1 ether, "!MINT:TOO_MUCH_BALANCE");
        require(msg.value == 45 ether, "!MINT");
        fund += 5 ether;
        _mint(msg.sender, 100 ether);
    }

    function lucky(uint amount) external {
        _burn(msg.sender, amount);

        uint random = uint(
            keccak256(
                abi.encodePacked(block.timestamp, block.number, msg.sender)
            )
        ) % 100;

        uint key = random * amount / 1 ether / 100;

        if(key > 80){
            uint id = nft.mint(msg.sender);
            uint reward = fund / 2;
            fund -= reward;
            payable(msg.sender).transfer(reward);
            emit Lucky(msg.sender, true, reward, id);
        } else {
            emit Lucky(msg.sender, false, 0, type(uint).max);
        }
    }

    function withdraw() external {
        require(msg.sender == owner, "!WITHDRAW:NOT_OWNER");
        payable(msg.sender).transfer(address(this).balance - fund);
    }
}
