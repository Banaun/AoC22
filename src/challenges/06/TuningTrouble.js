import { useState } from 'react';
import FileUploader from '../../components/FileUploader';

function TuningTrouble() {
  const [fileContent, setFileContent] = useState();
  const [firstAnswer, setFirstAnswer] = useState(0);
  const [secondAnswer, setSecondAnswer] = useState(0);
  const [error, setError] = useState('');

  let count = 0;

  const hasRepeated = (marker) => {
    return /(.).*\1/.test(marker);
  };

  const findMarker = () => {
    if (!fileContent) {
      if (!error) {
        setError('No file chosen');
      }
    } else {
      setError('');

      // Part 1
      for (let i = 0; i < fileContent.length; i++) {
        count += 1;

        if (!hasRepeated(fileContent.substring(i, i + 4))) {
          console.log(count, fileContent.substring(i, i + 4));
          break;
        }
      }

      setFirstAnswer(count + 3);
      count = 0;

      // Part 2
      for (let i = 0; i < fileContent.length; i++) {
        count += 1;

        if (!hasRepeated(fileContent.substring(i, i + 14))) {
          console.log(count, fileContent.substring(i, i + 14));
          break;
        }
      }
      setSecondAnswer(count + 13);
      count = 0;
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
            calculateAnswer={findMarker}
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

export default TuningTrouble;
