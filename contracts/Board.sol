pragma solidity 0.7.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

//
// The Board contract
//
contract Board is  AccessControl, VRFConsumerBase {

    struct Square {
        address payable purchaser;
        string squareTag;
        uint row;
        uint cell;
        uint across;
        uint down;
    }

    bytes32 internal keyHash;
    uint256 internal linkFee;
    uint256 internal randomResult;
    uint gameId;
    address internal payable host;
    address internal payable admin;
    uint boardFee;
    uint forwardPrize;
    uint backwardPrize;
    uint availableSquarezCount;
    enum GameState{STARTED, OVER};
    enum BoardStatus{OPEN, SOLDOUT, CLOSED};
    GameState game;
    BoardStatus boardStatus;
    uint gameStartTime;
    uint gameEndTime;
    string homeTeam;
    string awayTeam;
    uint[10] internal across;
    uint[10] internal down;
    Square[10][10] internal squarez;
    // address[4] internal payable forwardWinnerAddresses;
    mapping(address => uint) forwardWinnerAddresses;
    // address[4] internal payable backwardWinnerAddresses;
    mapping(addres => uint) backwardWinnerAddresses;
    uint[4] internal homeTeamScores;
    uint[4] internal awayTeamScores;

    event PrizeCollected(address winner, uint totalAmount);
    event SquarePurchased(address purchaser);

    constructor(uint _gameId, address _host, uint _boardFee, string _homeTeam, string _awayTeam) 
     VRFConsumerBase(
            0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, // VRF Coordinator
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709 // LINK Token
        ) public {
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        linkFee = 0.1 * 10 ** 18; // 0.1 LINK
        // set gameId
        gameId = _gameId;
        // set host
        host = _host;
        // set admin
        admin = msg.sender;
        // set boardFee; 
        boardFee = _boardFee;
        // TODO: allow board fee to be paid in Eth or Dai stablecoin 
        
        across = [0,1,2,3,4,5,6,7,8,9];
        down = [0,1,2,3,4,5,6,7,8,9];
        homeTeam = _homeTeam;
        awayTeam = _awayTeam;
        forwardPrize = boardFee * 15;
        backwardPrize = forwardPrize / 2;
        availableSquarezCount = 100;
        boardStatus = BoardStatus.OPEN;

        // create squarez
        for (uint i = 0; i < 10; i++){
            uint currentRow = i;
            for(uint j = 0; j < 10;  j++){
                uint currentCell = j;
                Square square;
                square.row = currentRow;
                square.cell = currentCell;
                
                squarez[currentRow][currentCell] = square; 
            }
        }


    }

    // modifiers

    //adminOnly
    modifier onlyAdmin {
        require(msg.sender == admin);
        _;
    }

    //hostOnly
    modifier onlyHost {
        require(msg.sender == host);
        _;
    }

    //adminOrHostOnly
    modifier adminOrHostOnly {
        require(msg.sender == admin || msg.sender == host);
        _;
    }

    //winnerOnly
    modifier winnerOnly {
        require(isWinner(msg.sender));
        _;
    }

    // initialize board
    // admin only
    function initializeBoard(uint seedNum) adminOnly {
        // transfer 2 link tokens
        require(LINK.transfer(address(this), 2, "Unable to transfer");
        // shuffle down and across array elements
        shuffle(seedNum);
        // update Sqaurez array
        for (uint i = 0; i < down.lenth; i++){
            uint currentRow = i;
            for(uint j = 0; j < across.length;  j++){
                uint currentCell = j;
                Square square = squarez[currentRow][currentCell];
                square.across = across[i];
                square.down = down[j];
                squarez[currentRow][currentCell] = square;
            }
        }
        // set board status to OPEN
        boardStatus = BoardStatus.OPEN;
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

    // purchaseSquare method:
    receive() external payable {
        require(availableSquarezCount >= 1, "This BigBoard is SOLD OUT.");
        require(msg.value == boardFee, "Please pay full board fee.");
        Square purchasedSquare;
        // selected square
        purchasedSquare = nextAvailableSquare();
        purchasedSquare.purchaser = msg.sender;
        // purchasedSquarez.push(purchasedSquare);
        purchasedSquarez[purchasedSquare.row][purchasedSquare.cell] = purchasedSquare;
        // decrement available squarez count
        availableSquarezCount--;
        if(availableSquarezCount == 0){
            boardStatus = BoardStatus.SOLDOUT;
        }
        // emit square purchased 
        emit SquarePurchased(msg.sender);
    }

    // buy a specific square 
    funtion buyThisSquare(uint row, uint cell) public payable {
        require(isAvailable(row, cell), "This Square is NOT AVAILABLE.");
        require(msg.value == boardFee, "Please pay full board fee.");
        Square selectedSquare = squarez[row][cell];
        selectedSquare.purcaser = msg.sender;
        availableSquarezCount--;
        if(availableSquarezCount == 0){
            boardStatus = BoardStatus.SOLDOUT;
        }
        emit SquarePurchased(msg.sender);
    }

    // get next available square
    function nextAvailableSquare() internal returns (Square){
        Square selectedSquare;
        // loop over squarez
        for (uint i = 0; i < 10; i++){
            uint currentRow = i;
            for(uint j = 0; j < 10;  j++){
                uint currentCell = j;
                selectedSquare = squarez[currentRow][currentCell]; 
                // if purchaser address is not set 
                if(selectedSquare.purchaser == address(0x0)){
                    break;
                }
            }
            // if purchaser address is not set 
            if(selectedSquare.purchaser == address(0x0)){
                break;
            }   
        }
        // end loop

        // return first square with no purchaser
        return selectedSquare;
    }

    // is square available
    function isAvailable(uint r, unit c) public returns (bool) {
        selectedSquare = squarez[r][c]; 
        // if purchaser address is not set 
        if(selectedSquare.purchaser == address(0x0)){
            return true
        } else{
            return false;
        }
    }
    

    // square purchasers or admin/host
    function selectWinners() adminOrHostOnly {
        // TODO: read current scores for this gameId from BigBoardz contract
        
        // require game is over
        require(game = GameState.OVER);
            // get last digit of total score for each quarter
            // for each quarter (4)
            for (uint q = 0; q < 4; q++){
                // get index of across digit matching last digit of homeTeam's score
                uint selectedCell;
                uint selectedRow;
                for (uint c = 0; c < across.length ; c++){
                    if(across[c] != homeTeamScores[q]){
                        continue;
                    } else{
                        selectedCell = c;
                    }
                } 
                // get index of down digit matching last digit of awayTeam's score
                for (uint r = 0; r < down.length; r++){
                    if(down[r] != awayTeamScores[q]){
                        continue;
                    } else{
                        selectedRow = r;
                    }
                } 
                
                // check for forward win
                if( purchasedSquarez[selectedRow][selectedCell] != null ){
                    // get the purchased square that has a cell == across index and row == down index
                    PurchasedSquare winningSquare = purchasedSquarez[selectedRow][selectedCell];
                    // place selected square's purchaser address in the quarter's forward winner
                    // forwardWinnerAddresses[q] = winningSquare.purchaser;
                    uint quarter = q + 1;
                    forwardWinnerAddresses[winningSquare.purchaser] = quarter;
                }
                
                // check for backward win
                if( purchasedSquarez[selectedCell][selectedRow] != null ){
                    // get the purchased square that has a cell == down index and row == across index
                    PurchasedSquare bWinningSquare = purchasedSquarez[selectedCell][selectedRow];
                    // place selected square's purchaser address in the quarter's backward winner
                    uint quarter = q + 1;
                    // backwardWinnerAddresses[q] = bWinningSquare.purchaser;
                    backwardWinnerAddresses[bWinningSquare.purchaser] = quarter;
                }
                
            }
    }

    function isWinner(address possibleWinner) public returns(bool){
        if(forwardWinnerAddresses[possibleWinner] >= 1 || backwardWinnerAddresses[possibleWinner] >= 1){
            return true;
        } else {
            return false;
        }
    }
    
    // winner only
    function collectPrize() winnerOnly {

        // require msg.sender be listed as a winner
        uint fMultiplier = 0;
        uint bMultiplier = 0;
        uint totalFPrize = 0;
        uint totalBPrize = 0;
        uint totalPrize;
        // for each address in forwardWinnerAddresses
        for (uint p = 0; p > forwardWinnerAddresses.length; p++){
            if (msg.sender == forWardWinnderAddress[p]){
                fMultiplier++ 
            }
                
        }
        totalFPrize = forwardPrize * fMultiplier;
        // for each address in forwardWinnerAddresses
        for (uint bP = 0; bP > backwardWinnerAddresses.length; bP++){
            if (msg.sender == forWardWinnderAddress[bP]){
                bMultiplier++ 
            }
                
        }
    
        totalBPrize = backwardPrize * bMultiplier;
        uint total = totalFPrize + totalBPrize;
        address(msg.sender).transfer(total);
        emit PrizeCollected(msg.sender, total);
    }

    // host only
    // TODO: finish this method
    function collectProfits() hostOnly {
        // 
    }
    /** 
     * Requests randomness from a user-provided seed
     */
    function getRandomNumber(uint256 userProvidedSeed) internal returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) > fee, "Not enough LINK - ");
        return requestRandomness(keyHash, fee, userProvidedSeed);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        require(msg.sender == vrfCoordinator, "Fulfillment only permitted by Coordinator");
        randomResult = randomness;
    }
    // shuffle method
    // admin only
    // can only be called once
    function shuffle(uint seed) internal adminOnly {

        for(uint s = across.length -1; s > 0; s--){
            getRandomNumber(seed);
            uint randomIndex = randomResult % across.length;
            across[s], across[randomIndex] = across[randomIndex], across[s];
        }

        for(uint s = down.length -1; s > 0; s--){
            getRandomNumber(seed);
            uint randomIndex = randomResult % down.length;
            down[s], down[randomIndex] = [down[randomIndex], down[s];
        }

    }
}