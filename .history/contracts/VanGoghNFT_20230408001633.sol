// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VanGoghSD is ERC721, Ownable {
    constructor() ERC721("VanGogh", "VGSD") {}

    string baseTokenURI =
        "ipfs://bafkreifwn5ih55w7vkm4kxk6xj2vtj2iwx5scjk32r3ixszjmvx4edfqye";

    string public contractURI =
        "ipfs://bafybeibsfpoi5vvy3z3h7kehcwrpnakwth4wrredsfnupx6e5vrwttxjgq/";
    mapping(address => bool) minted;

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    baseTokenURI,
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function safeMint(address to, uint256 tokenId) public {
        require(tokenId >= 0 && tokenId <= 95, "VanGoghSD: invalid tokenId");
        require(!minted[to], "VanGoghSD: One token per Adresss");
        require(
            msg.sender == to,
            "VanGoghSD: sender must be the receiving address"
        );
        minted[to] = true;
        _safeMint(to, tokenId);
    }
}