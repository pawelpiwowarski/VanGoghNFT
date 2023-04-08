// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

contract VanGoghSD is ERC721, Ownable {
    constructor() ERC721("VanGogh", "VGSD") {}

    function supportsInterface(
        bytes4 interfaceId
    ) public pure override returns (bool) {
        return interfaceId == type(IERC721).interfaceId;
    }

    string public contractURI =
        "ipfs://bafkreietf2ie63pcbzwfi6ojkrcoos5sck5pwzovuygsx2strcmmas2pvu/";

    string baseTokenURI =
        "ipfs://bafybeibsfpoi5vvy3z3h7kehcwrpnakwth4wrredsfnupx6e5vrwttxjgq/";
    mapping(address => bool) minted;

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        require(_tokenId >= 0 && _tokenId <= 95, "VanGoghSD: invalid tokenId");
        return
            string(
                abi.encodePacked(
                    baseTokenURI,
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function safeMint(uint256 tokenId) public {
        require(tokenId >= 0 && tokenId <= 95, "VanGoghSD: invalid tokenId");
        require(!minted[msg.sender], "VanGoghSD: One token per Adresss");
        minted[msg.sender] = true;
        _safeMint(msg.sender, tokenId);
    }

    fallback() external payable {
        revert("Fallback function called - Ether not accepted");
    }

    receive() external payable {
        revert("Fallback function called - Ether not accepted");
    }
}
