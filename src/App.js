import CalorieCounter from './challenges/01/CalorieCounter';
import RockPaperScissors from './challenges/02/RockPaperScissors';
import RucksackReorganization from './challenges/03/RucksackReorganization';
import CampCleanup from './challenges/04/CampCleanup';
import Snowflakes from './components/Snowflakes';
import GitHubIcon from './images/github-icon.png';

function App() {
  return (
    <div className='main-container'>
      <Snowflakes />
      <div className='repo-container'>
        <a
          href='https://github.com/Banaun/aoc22'
          target='_blank'
          rel='noreferrer'
        >
          <img src={GitHubIcon} alt='link to repo'></img>
        </a>
      </div>
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
        <div className='day-container'>
          <h2 className='title'>--- Day 3: Rucksack Reorganization ---</h2>
          <RucksackReorganization />
        </div>
        <div className='day-container'>
          <h2 className='title'>--- Day 4: Camp Cleanup ---</h2>
          <CampCleanup />
        </div>
      </div>
    </div>
  );
}

export default App;
