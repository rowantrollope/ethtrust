pragma solidity >=0.5.0 <0.9.0;

import "./HitchensUnorderedKeySet.sol";

contract Trusts {

    using HitchensUnorderedKeySetLib for HitchensUnorderedKeySetLib.Set;
    HitchensUnorderedKeySetLib.Set trustSet;
 
    // data structure that stores a trust
    struct Trust {
        bytes32 key;
        string name;
        address beneficiary;
        address trustee;
        address creator;
        uint etherAmount;
        uint createdDate;
        uint maturityDate;
    }

    bytes32 nextKey;
 
    mapping(bytes32 => Trust) trusts;
    
    event LogCreateTrust(address sender, bytes32 key, string name);
    event LogUpdateTrust(address sender, bytes32 key, string name);    
    event LogDepositTrust(address sender, bytes32 key, uint etherAmount);    
    event LogRemoveTrust(address sender, bytes32 key);

    /**
     * Constructor function
     */
    constructor() public {
        nextKey = '0x1';
    }

    function createTrust (address _beneficiary, address _trustee,
                         string memory _name,  
                         uint _maturityDate) public payable returns(bytes32 key) {
        
 
        trustSet.insert(nextKey); // Note that this will fail automatically if the key already exists.
        
        Trust storage t = trusts[nextKey];
    
        t.key = nextKey;
        t.name = _name;
        t.beneficiary = _beneficiary;
        t.trustee = _trustee;
        t.etherAmount = msg.value;
        t.creator = msg.sender;
        t.createdDate = now;
        t.maturityDate = _maturityDate;

        uint n = uint(nextKey);
        n++;
        nextKey = bytes32(n);

        emit LogCreateTrust(msg.sender, t.key, t.name);
        
        return t.key;
    }

    function updateTrust(bytes32 key, address _beneficiary, 
                         string memory _name,  
                         uint _maturityDate) public {
        
        require(trustSet.exists(key), "Can't update a trust that doesn't exist.");
        Trust storage t = trusts[key];

        require(msg.sender == t.creator, "Only the creator can update this trust.");

        t.name = _name;
        t.beneficiary = _beneficiary;
        t.maturityDate = _maturityDate;

        emit LogUpdateTrust(msg.sender, t.key, t.name);
    }
    
    function depositTrust(bytes32 key) public payable {
        
        require(trustSet.exists(key), "Can't update a trust that doesn't exist.");
        
        Trust storage t = trusts[key];

        t.etherAmount += msg.value;

        //emit LogDepositTrust(msg.sender, key, msg.value);
    }
    
    function deleteTrust(bytes32 key) public {

        require(trustSet.exists(key), "Can't delete a trust that doesn't exist.");
        
        Trust memory t = trusts[key];

        require(t.etherAmount == 0, "Can't delete a trust with ether, withdraw first.");
        require(msg.sender == t.creator, "Only the creator can delete this trust.");

        trustSet.remove(key); // Note that this will fail automatically if the key doesn't exist
        
        delete trusts[key];
        
        emit LogRemoveTrust(msg.sender, key);
    }
 
 /*         bytes32 key;
        string name;
        address beneficiary;
        uint etherAmount;
        address creator;
        uint createdDate;
        uint maturityDate;
 */
    function getTrustName(bytes32 key) public view returns(string memory name)
    {
        require(trustSet.exists(key), "Trust not found");
        Trust storage t = trusts[key];
        return t.name;
    }
    function getTrust(bytes32 _key) public view returns( bytes32 key,
                                                        string memory name, 
                                                        address beneficiary,
                                                        uint etherAmount,
                                                        address creator,
                                                        uint createdDate,
                                                        uint maturityDate) {
        
        require(trustSet.exists(_key), "Can't get a trust that doesn't exist.");
        
        Trust storage t = trusts[_key];

        return(t.key, t.name, t.beneficiary, t.etherAmount, t.creator, t.createdDate, t.maturityDate);
    }
    
    function getTrustCount() public view returns(uint count) {
        return trustSet.count();
    }
    
    function getTrustAtIndex(uint index) public view returns(bytes32 key) {
        return trustSet.keyAtIndex(index);
    }

    // Todo: Add OnlyAfter
    
    function withdraw (bytes32 key, uint _etherAmount) public payable {
        
        require(trustSet.exists(key), "Trust doesn't exist.");

        Trust storage t = trusts[key];

        require(msg.sender == t.creator || 
                msg.sender == t.beneficiary ||
                msg.sender == t.trustee
                , "Only Creator and Owner can withdraw");
        
        if(msg.sender != t.creator)
            require(t.maturityDate >= now, "Cannot withdraw until Maturity date");
 
        //TODO: Check that date allows
        require(_etherAmount <= t.etherAmount, "Can't withdraw more ether than exists in trust");

        msg.sender.transfer(_etherAmount);
        
        t.etherAmount -= _etherAmount;
    }
    
    function withdrawAll (bytes32 key) public payable {
        
        require(trustSet.exists(key), "Trust doesn't exist.");
        Trust memory t = trusts[key];
        withdraw(key, t.etherAmount);
    }
}
