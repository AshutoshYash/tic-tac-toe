import Board from "./Board"
import { useState, useEffect } from "react";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import gameOverSoundAsset from "../Sounds/game_over.wav";
import clickSoundAsset from "../Sounds/click.wav";

const gameOverSound = new Audio(gameOverSoundAsset)
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset)
clickSound.volume = 0.5;

const player_x = "X";
const player_o = "O"; 
const winningCombinations = [
    //rows
    {combo:[0,1,2],strikeClass: "strike-row-1"},
    {combo:[3,4,5],strikeClass: "strike-row-2"},
    {combo:[6,7,8],strikeClass: "strike-row-3"},
    //columns 
    {combo:[0,3,6],strikeClass: "strike-column-1"},
    {combo:[1,4,7],strikeClass: "strike-column-2"},
    {combo:[2,5,8],strikeClass: "strike-column-3"},
    //diagonals
    {combo:[0,4,8],strikeClass: "strike-diagonal-1"},
    {combo:[2,4,6],strikeClass: "strike-diagonal-2"},
];
function checkWinner(tiles, setStrikeClass, setGameState){
    for(const {combo, strikeClass} of winningCombinations){
        const tileValue1 = tiles[combo[0]]
        const tileValue2 = tiles[combo[1]]
        const tileValue3 = tiles[combo[2]]
    if(tileValue1 !== null && tileValue1===tileValue2 && tileValue1 === tileValue3)
       {setStrikeClass(strikeClass);
       if(tileValue1 === player_x){
        setGameState(GameState.playerxwins);
       }
       else
       setGameState(GameState.playerowins);
      return;
    }
    }
    const allfilled = tiles.every((tile)=> tile!== null);
    if(allfilled){
        setGameState(GameState.draw);
    }
}

function TicTacToe(){
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(player_x);
    const [strikeClass, setStrikeClass] = useState();
    const [gameState, setGameState] = useState(GameState.inprogress);
    
    const handleTileClick = (index)=>{
        if(gameState !== GameState.inprogress){
            return;
        }
         if(tiles[index] !== null){
            return;
         }
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        if(playerTurn===player_x)
        setPlayerTurn(player_o);
        else
        setPlayerTurn(player_x);
    }
    const handleReset = ()=> {
        setGameState(GameState.inprogress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(player_x);
        setStrikeClass(null);
    }
    useEffect(()=>{
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles]);

    useEffect(()=>{
        if(tiles.some((tile)=> tile!== null)){
            clickSound.play();
        }
    }, [tiles]);

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Board playerTurn={playerTurn} tiles ={tiles} onTileClick={handleTileClick} 
            strikeClass={strikeClass}
            />
            <GameOver gameState ={gameState}/>
            <Reset gameState ={gameState} onReset = {handleReset}/>
        </div>
    )
}
export default TicTacToe;