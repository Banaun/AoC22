import { useState } from 'react';
import FileUploader from '../../components/FileUploader';

function CampCleanup() {
  const [fileContent, setFileContent] = useState();
  const [firstAnswer, setFirstAnswer] = useState(0);
  const [secondAnswer, setSecondAnswer] = useState(0);
  const [error, setError] = useState('');

  const countPairs = () => {
    if (!fileContent) {
      if (!error) {
        setError('No file chosen');
      }
    } else {
      setError('');

      let pairsArr = fileContent.split(/\r?\n/);
      let pairsContainCount = 0;
      let pairsOverlapCount = 0;

      for (let i = 0; i < pairsArr.length; i++) {
        const [firstAssignment, secondAssignment] = pairsArr[i].split(',');
        const firstAssignmentArr = firstAssignment.split('-');
        const secondAssignmentArr = secondAssignment.split('-');

        // Part 1
        if (checkIfContain(firstAssignmentArr, secondAssignmentArr)) {
          pairsContainCount += 1;
        }

        // Part 2
        if (checkIfOverlap(firstAssignmentArr, secondAssignmentArr)) {
          pairsOverlapCount += 1;
        }
      }

      setFirstAnswer(pairsContainCount);
      setSecondAnswer(pairsOverlapCount);
      pairsContainCount = 0;
      pairsOverlapCount = 0;
    }
  };

  // Part 1
  const checkIfContain = (first, second) => {
    if (parseInt(first[0]) >= parseInt(second[0])) {
      if (parseInt(first[1]) <= parseInt(second[1])) {
        return true;
      }
    }
    if (parseInt(second[0]) >= parseInt(first[0])) {
      if (parseInt(second[1]) <= parseInt(first[1])) {
        return true;
      }
    }
    return false;
  };

  // Part 2
  const checkIfOverlap = (first, second) => {
    if (parseInt(second[0]) <= parseInt(first[0])) {
      return parseInt(second[1]) >= parseInt(first[0]);
    } else {
      return parseInt(second[0]) <= parseInt(first[1]);
    }
  };

  return (
    <>
      <h4>
        See the <a href='/questions/04/question04.txt'>question</a>
      </h4>
      <h4>
        Upload a .txt-file with the{' '}
        <a href='/puzzle-inputs/04/input04.txt'>puzzle input</a>
      </h4>
      <div className='input-wrapper'>
        <div>
          <FileUploader
            calculateAnswer={countPairs}
            calculateAnswerBtnText='Count pairs'
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

export default CampCleanup;
