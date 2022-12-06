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

  const prepareMove = (move) => {
    let moving = [];

    switch (move.start) {
      case 1:
        moving = stackOne.splice(0, move.quantity);
        break;
      case 2:
        moving = stackTwo.splice(0, move.quantity);
        break;
      case 3:
        moving = stackThree.splice(0, move.quantity);
        break;
      case 4:
        moving = stackFour.splice(0, move.quantity);
        break;
      case 5:
        moving = stackFive.splice(0, move.quantity);
        break;
      case 6:
        moving = stackSix.splice(0, move.quantity);
        break;
      case 7:
        moving = stackSeven.splice(0, move.quantity);
        break;
      case 8:
        moving = stackEight.splice(0, move.quantity);
        break;
      case 9:
        moving = stackNine.splice(0, move.quantity);
        break;
      default:
        console.log('default case');
        break;
    }

    return moving;
  };

  // Part 1
  const makeMove = (elementArr, to) => {
    switch (to) {
      case 1:
        elementArr.map((el) => stackOne.unshift(el));
        break;
      case 2:
        elementArr.map((el) => stackTwo.unshift(el));
        break;
      case 3:
        elementArr.map((el) => stackThree.unshift(el));
        break;
      case 4:
        elementArr.map((el) => stackFour.unshift(el));
        break;
      case 5:
        elementArr.map((el) => stackFive.unshift(el));
        break;
      case 6:
        elementArr.map((el) => stackSix.unshift(el));
        break;
      case 7:
        elementArr.map((el) => stackSeven.unshift(el));
        break;
      case 8:
        elementArr.map((el) => stackEight.unshift(el));
        break;
      case 9:
        elementArr.map((el) => stackNine.unshift(el));
        break;
      default:
        console.log('default case');
        break;
    }
  };

  // Part 2
  const makeMultipleMove = (elementArr, to) => {
    switch (to) {
      case 1:
        stackOne = [...elementArr, ...stackOne];
        break;
      case 2:
        stackTwo = [...elementArr, ...stackTwo];
        break;
      case 3:
        stackThree = [...elementArr, ...stackThree];
        break;
      case 4:
        stackFour = [...elementArr, ...stackFour];
        break;
      case 5:
        stackFive = [...elementArr, ...stackFive];
        break;
      case 6:
        stackSix = [...elementArr, ...stackSix];
        break;
      case 7:
        stackSeven = [...elementArr, ...stackSeven];
        break;
      case 8:
        stackEight = [...elementArr, ...stackEight];
        break;
      case 9:
        stackNine = [...elementArr, ...stackNine];
        break;
      default:
        console.log('default case');
        break;
    }
  };

  const separateStacks = (input) => {
    stackOne = [];
    stackTwo = [];
    stackThree = [];
    stackFour = [];
    stackFive = [];
    stackSix = [];
    stackSeven = [];
    stackEight = [];
    stackNine = [];

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

      // Part 1
      separateStacks(stacksArr);

      for (let i = 0; i < instructionsArr.length; i++) {
        const move = parseMove(instructionsArr[i]);

        const moving = prepareMove(move);

        makeMove(moving, move.end);
      }

      setFirstAnswer(
        stackOne[0].charAt(1) +
          stackTwo[0].charAt(1) +
          stackThree[0].charAt(1) +
          stackFour[0].charAt(1) +
          stackFive[0].charAt(1) +
          stackSix[0].charAt(1) +
          stackSeven[0].charAt(1) +
          stackEight[0].charAt(1) +
          stackNine[0].charAt(1)
      );

      // Part 2
      separateStacks(stacksArr);

      for (let j = 0; j < instructionsArr.length; j++) {
        const move = parseMove(instructionsArr[j]);

        const moving = prepareMove(move, true);

        makeMultipleMove(moving, move.end);
      }

      setSecondAnswer(
        stackOne[0].charAt(1) +
          stackTwo[0].charAt(1) +
          stackThree[0].charAt(1) +
          stackFour[0].charAt(1) +
          stackFive[0].charAt(1) +
          stackSix[0].charAt(1) +
          stackSeven[0].charAt(1) +
          stackEight[0].charAt(1) +
          stackNine[0].charAt(1)
      );
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
            calculateAnswerBtnText='Rearrange crates'
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
