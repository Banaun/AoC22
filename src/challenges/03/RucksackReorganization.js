import { useState } from 'react';

function RucksackReorganization() {
  const [fileContent, setFileContent] = useState();
  const [firstAnswer, setFirstAnswer] = useState(0);
  const [secondAnswer, setSecondAnswer] = useState(0);
  const [error, setError] = useState('');

  const textType = /text.*/;

  const priorities = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    A: 27,
    B: 28,
    C: 29,
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52,
  };

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

  const split = (str) => {
    const result = [str.slice(0, str.length / 2), str.slice(str.length / 2)];

    return result;
  };

  const calculateSumOfPriorities = () => {
    if (!fileContent) {
      setError('No file chosen');
    } else {
      setError('');

      let rucksackArr = fileContent.split(/\r?\n/);
      let elfGroupsArr = fileContent.match(/(?:^.*\r?\n?){3}/gm);
      let firstSum = 0;
      let secondSum = 0;

      for (let i = 0; i < rucksackArr.length; i++) {
        const [firstCompartment, secondCompartment] = split(rucksackArr[i]);
        const firstCompartmentArr = [...firstCompartment];
        const secondCompartmentArr = [...secondCompartment];

        const itemType = firstCompartmentArr.filter((item) =>
          secondCompartmentArr.includes(item)
        );

        firstSum += priorities[itemType[0]];
      }

      for (let j = 0; j < elfGroupsArr.length; j++) {
        const groupArr = elfGroupsArr[j].split(/\r?\n/);
        const firstRucksackArr = [...groupArr[0]];
        const secondtRucksackArr = [...groupArr[1]];
        const thirdtRucksackArr = [...groupArr[2]];

        const badge = firstRucksackArr.filter(
          (badge) =>
            secondtRucksackArr.includes(badge) &&
            thirdtRucksackArr.includes(badge)
        );

        secondSum += priorities[badge[0]];
      }

      setFirstAnswer(firstSum);
      setSecondAnswer(secondSum);
      firstSum = 0;
      secondSum = 0;
    }
  };

  const handleFileRead = () => {
    let content = fileReader.result;
    setFileContent(content);
  };

  return (
    <>
      <h4>
        See the <a href='/questions/03/question03.txt'>question</a>
      </h4>
      <h4>
        Upload a .txt-file with the{' '}
        <a href='/puzzle-inputs/03/input03.txt'>puzzle input</a>
      </h4>
      <div className='input-wrapper'>
        <div>
          <input type='file' accept='.txt' onChange={handleChange} />
          <button onClick={calculateSumOfPriorities} disabled={error}>
            Calculate sum
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

export default RucksackReorganization;
