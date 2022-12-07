import { useState } from 'react';
import FileUploader from '../../components/FileUploader';

function BrowseDirectories() {
  const [fileContent, setFileContent] = useState();
  const [firstAnswer, setFirstAnswer] = useState(0);
  const [secondAnswer, setSecondAnswer] = useState(0);
  const [error, setError] = useState('');

  const calculateDirSize = () => {
    if (!fileContent) {
      if (!error) {
        setError('No file chosen');
      }
    } else {
      setError('');

      const commandsArr = fileContent.split(/\r?\n/);
      const dirContentArr = fileContent.split(/\$ cd /);

      const allDirectories = commandsArr.filter((command) =>
        command.startsWith('dir')
      );

      let dirToDelete = [];
      let dirSize = 0;

      for (let line in commandsArr) {
        // console.log(commandsArr[line]);
        const words = commandsArr[line].split(' ');

        console.log(words);
      }
      //   console.log(dirContentArr);
    }
  };

  return (
    <>
      <h4>
        See the <a href='/questions/07/question07.txt'>question</a>
      </h4>
      <h4>
        Upload a .txt-file with the{' '}
        <a href='/puzzle-inputs/07/input07.txt'>puzzle input</a>
      </h4>
      <div className='input-wrapper'>
        <div>
          <FileUploader
            calculateAnswer={calculateDirSize}
            calculateAnswerBtnText='Calculate directories'
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

export default BrowseDirectories;
