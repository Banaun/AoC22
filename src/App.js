import CalorieCounter from './challenges/01/CalorieCounter';
import RockPaperScissors from './challenges/02/RockPaperScissors';
import Snowflakes from './components/Snowflakes';

function App() {
  return (
    <div className='main-container'>
      <Snowflakes />
      <div>
        <h1 className='main-title'>Advent of Code 2022</h1>
        <div className='day-container'>
          <h2 className='title'>--- Day 1: Calorie Counting ---</h2>
          <CalorieCounter />
        </div>
        <div className='day-container'>
          <h2 className='title'>--- Day 2: Rock Paper Scissors ---</h2>
          <RockPaperScissors />
        </div>
      </div>
    </div>
  );
}

export default App;
