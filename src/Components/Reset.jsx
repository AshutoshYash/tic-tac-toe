import GameState from "./GameState";
function Reset({gameState, onReset}){
     if(gameState === GameState.inprogress){
        return;
     }
     return <button onClick={onReset} className="reset-button">RESET</button>;
}
export default Reset;