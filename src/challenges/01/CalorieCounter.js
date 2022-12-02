import { useState } from 'react';

function CalorieCounter() {
  const [fileContent, setFileContent] = useState();
  const [firstAnswer, setFirstAnswer] = useState(0);
  const [secondAnswer, setSecondAnswer] = useState(0);
  const [error, setError] = useState('');

  const textType = /text.*/;

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

  const countCalories = () => {
    if (!fileContent) {
      setError('No file chosen');
    } else {
      setError('');

      let caloriesArr = fileContent.split(/\r?\n/);
      let caloriesCount = 0;
      let topThreeCalories = [];

      for (let i = 0; i < caloriesArr.length; i++) {
        if (caloriesArr[i] === '') {
          topThreeCalories.push(caloriesCount);
          if (topThreeCalories.length > 3) {
            topThreeCalories.sort(function (a, b) {
              return b - a;
            });
            topThreeCalories.pop();
          }

          caloriesCount = 0;
        } else {
          caloriesCount += parseInt(caloriesArr[i]);
        }
      }

      setFirstAnswer(topThreeCalories[0]);
      setSecondAnswer(
        topThreeCalories[0] + topThreeCalories[1] + topThreeCalories[2]
      );
    }
  };

  return (
    <>
      <h4>
        Upload a .txt-file with the{' '}
        <a href='/puzzle-inputs/01/input01.txt'>puzzle input</a>
      </h4>
      <div className='input-wrapper'>
        <div>
          <input type='file' accept='.txt' onChange={handleChange} />
          <button onClick={countCalories} disabled={error}>
            Count calories
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

export default CalorieCounter;
