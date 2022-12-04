function FileUploader({
  calculateAnswer,
  calculateAnswerBtnText,
  fileContent,
  setError,
}) {
  const textType = /text.*/;
  let fileReader;

  const handleChange = (e) => {
    let file = e.target.files[0];
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;

    if (file.size < 100000 && file.type.match(textType)) {
      setError('');
      fileReader.readAsText(file);
    } else {
      setError('Invalid file!');
    }
  };

  const handleFileRead = () => {
    let content = fileReader.result;
    fileContent(content);
  };

  return (
    <div>
      <input type='file' accept='.txt' onChange={handleChange} />
      <button onClick={calculateAnswer}>{calculateAnswerBtnText}</button>
    </div>
  );
}

export default FileUploader;
