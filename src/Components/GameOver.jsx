import GameState from "./GameState";
function GameOver({gameState}){
       switch(gameState){
        case GameState.inprogress:
            return <></>;
        case GameState.playerowins:
            return <div className='game-over'>O WINS</div>
        case GameState.playerxwins:
            return <div className='game-over'>X WINS</div>
        case GameState.draw:
            return <div className='game-over'>DRAW</div>
        default:
            return <></>;
       }
}
export default GameOver;