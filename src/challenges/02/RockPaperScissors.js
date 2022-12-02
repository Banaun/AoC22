import { useState } from 'react';

function RockPaperScissors() {
  const [fileContent, setFileContent] = useState();
  const [firstAnswer, setFirstAnswer] = useState();
  const [secondAnswer, setSecondAnswer] = useState();
  const [error, setError] = useState('');

  const textType = /text.*/;

  // A & X = Rock (Part One)
  const X = 1;
  // B & Y = Paper (Part One)
  const Y = 2;
  // C & Z = Scissors (Part One)
  const Z = 3;

  // Z = win (Part Two)
  const win = 6;
  // Y = draw (Part Two)
  const draw = 3;
  // X = loss (Part Two)
  const loss = 0;

  let fileReader;

  const handleChange = (e) => {
    let file = e.target.files[0];
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;

    if (file.size < 100000) {
      if (file.type.match(textType)) {
        setError('');
        fileReader.readAsText(file);
      } else {
        setError('Invalid file type!');
      }
    } else {
      setError('File is too big!');
    }
  };

  const handleFileRead = (e) => {
    let content = fileReader.result;
    setFileContent(content);
  };

  const calculateScore = () => {
    if (!fileContent) {
      setError('No file chosen');
    } else {
      setError('');

      let strategyGuideArr = fileContent.split(/\r?\n/);
      let firstScore = 0;
      let secondScore = 0;

      for (let i = 0; i < strategyGuideArr.length; i++) {
        switch (strategyGuideArr[i]) {
          case 'A X':
            firstScore += X + draw;
            secondScore += loss + Z;
            break;
          case 'A Y':
            firstScore += Y + win;
            secondScore += draw + X;
            break;
          case 'A Z':
            firstScore += Z + loss;
            secondScore += win + Y;
            break;
          case 'B X':
            firstScore += X + loss;
            secondScore += loss + X;
            break;
          case 'B Y':
            firstScore += Y + draw;
            secondScore += draw + Y;
            break;
          case 'B Z':
            firstScore += Z + win;
            secondScore += win + Z;
            break;
          case 'C X':
            firstScore += X + win;
            secondScore += loss + Y;
            break;
          case 'C Y':
            firstScore += Y + loss;
            secondScore += draw + Z;
            break;
          case 'C Z':
            firstScore += Z + draw;
            secondScore += win + X;
            break;
          default:
            break;
        }
      }

      setFirstAnswer(firstScore);
      setSecondAnswer(secondScore);
      firstScore = 0;
      secondScore = 0;
    }
  };

  return (
    <>
      <h4>
        See the <a href='/questions/02/question02.txt'>question</a>
      </h4>
      <h4>
        Upload a .txt-file with the{' '}
        <a href='/puzzle-inputs/02/input02.txt'>puzzle input</a>
      </h4>
      <div className='input-wrapper'>
        <div>
          <input type='file' accept='.txt' onChange={handleChange} />
          <button onClick={calculateScore} disabled={error}>
            Calculate score
          </button>
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

export default RockPaperScissors;
