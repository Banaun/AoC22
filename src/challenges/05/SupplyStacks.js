import { useState } from 'react';
import FileUploader from '../../components/FileUploader';

function SupplyStacks() {
  const [fileContent, setFileContent] = useState();
  const [firstAnswer, setFirstAnswer] = useState(0);
  const [secondAnswer, setSecondAnswer] = useState(0);
  const [error, setError] = useState('');

  let stackOne = [];
  let stackTwo = [];
  let stackThree = [];
  let stackFour = [];
  let stackFive = [];
  let stackSix = [];
  let stackSeven = [];
  let stackEight = [];
  let stackNine = [];

  const parseMove = (input) => {
    const [, quantity, start, end] = /move (\d+) from (\d+) to (\d+)/
      .exec(input)
      .map((number) => parseInt(number));
    return { quantity, start, end };
  };

  const makeMove = (elementArr, to) => {
    console.log(elementArr, to);
    switch (to) {
      case '1':
        console.log('case 1');
        break;
      case '2':
        console.log('case 2');
        break;
      case '3':
        console.log('case 3');
        break;
      case '4':
        console.log('case 4');
        break;
      case '5':
        console.log('case 5');
        break;
      case '6':
        console.log('case 6');
        break;
      case '7':
        console.log('case 7');
        break;
      case '8':
        console.log('case 8');
        break;
      case '9':
        console.log('case 9');
        break;
      default:
        console.log('default case');
        break;
    }
  };

  const separateStacks = (input) => {
    for (let i = 0; i < input.length; i++) {
      if (input[i].startsWith('[')) {
        stackOne.push(input[i].substring(0, 3));
      }
      if (input[i].startsWith('[', 4)) {
        stackTwo.push(input[i].substring(4, 7));
      }
      if (input[i].startsWith('[', 8)) {
        stackThree.push(input[i].substring(8, 11));
      }
      if (input[i].startsWith('[', 12)) {
        stackFour.push(input[i].substring(12, 15));
      }
      if (input[i].startsWith('[', 16)) {
        stackFive.push(input[i].substring(16, 19));
      }
      if (input[i].startsWith('[', 20)) {
        stackSix.push(input[i].substring(20, 23));
      }
      if (input[i].startsWith('[', 24)) {
        stackSeven.push(input[i].substring(24, 27));
      }
      if (input[i].startsWith('[', 28)) {
        stackEight.push(input[i].substring(28, 31));
      }
      if (input[i].startsWith('[', 32)) {
        stackNine.push(input[i].substring(32, 35));
      }
    }
  };

  const rearrangeStacks = () => {
    if (!fileContent) {
      if (!error) {
        setError('No file chosen');
      }
    } else {
      setError('');

      const [stacks, instructions] = fileContent.split(/\r?\n\r?\n/);
      const stacksArr = stacks.split(/\r?\n/);
      const instructionsArr = instructions.split(/\r?\n/);

      separateStacks(stacksArr);

      for (let j = 0; j < instructionsArr.length; j++) {
        console.log(instructionsArr[j]);

        const move = parseMove(instructionsArr[j]);

        let moving = [];

        switch (move.start) {
          case 1:
            console.log('case 1');
            moving = stackOne.splice(0, move.quantity);
            makeMove(moving, move.end);
            break;
          case 2:
            console.log('case 2');
            break;
          case 3:
            console.log('case 3');
            break;
          case 4:
            console.log('case 4');
            break;
          case 5:
            console.log('case 5');
            break;
          case 6:
            console.log('case 6');
            break;
          case 7:
            console.log('case 7');
            break;
          case 8:
            console.log('case 8');
            break;
          case 9:
            console.log('case 9');
            break;
          default:
            console.log('default case');
            break;
        }
      }
    }
  };

  return (
    <>
      <h4>
        See the <a href='/questions/05/question05.txt'>question</a>
      </h4>
      <h4>
        Upload a .txt-file with the{' '}
        <a href='/puzzle-inputs/05/input05.txt'>puzzle input</a>
      </h4>
      <div className='input-wrapper'>
        <div>
          <FileUploader
            calculateAnswer={rearrangeStacks}
            calculateAnswerBtnText='Calculate calories'
            fileContent={(content) => setFileContent(content)}
            setError={(text) => setError(text)}
          />
        </div>
      </div>
      {firstAnswer ? (
        <div className='output-wrapper'>
          <h4>Answer Part 1: {firstAnswer}</h4>
          <h4>Answer Part 2: {secondAnswer}</h4>
        </div>
      ) : error ? (
        <div className='error-wrapper'>
          <p>{error}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SupplyStacks;
