import { useState } from 'react';

function CalorieCounter() {
  const [fileContent, setFileContent] = useState();
  const [mostCalories, setMostCalories] = useState(0);
  const [secondMostCalories, setSecondMostCalories] = useState(0);
  const [thirdMostCalories, setThirdMostCalories] = useState(0);
  const [error, setError] = useState('');

  const textType = /text.*/;

  let fileReader;

  const handleChange = (e) => {
    let file = e.target.files[0];
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;

    if (file.type.match(textType)) {
      setError('');
      fileReader.readAsText(file);
    } else {
      setError('Invalid file type');
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

      setMostCalories(topThreeCalories[0]);
      setSecondMostCalories(topThreeCalories[1]);
      setThirdMostCalories(topThreeCalories[2]);
    }
  };

  return (
    <>
      <div className='input-wrapper'>
        <div>
          <input type='file' accept='.txt' onChange={handleChange} />
          <button onClick={countCalories} disabled={error}>
            Count calories
          </button>
        </div>
      </div>
      {mostCalories ? (
        <div className='output-wrapper'>
          <h4>Most calories: {mostCalories}</h4>
          <h4>Second most calories: {secondMostCalories}</h4>
          <h4>Third most calories: {thirdMostCalories}</h4>
          <h3>
            Total: {mostCalories + secondMostCalories + thirdMostCalories}
          </h3>
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
