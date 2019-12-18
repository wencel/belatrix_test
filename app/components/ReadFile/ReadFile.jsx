import React from 'react';
import PropTypes from 'prop-types';
import './stylesReadFile.css';

const ReadFile = ({ handleFileChanged }) => {
  let fileReader;
  const handleFileRead = () => {
    const text = fileReader.result;
    handleFileChanged(text);
  };
  const handleFileChosen = file => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };
  const selectFile = () => {
    document.getElementById('text_file').click();
  };
  return (
    <div className="fileContainer">
      <button type="button" className="btn" onClick={selectFile}>
        Select File
      </button>
      <input
        className="fileInput"
        type="file"
        id="text_file"
        accept=".txt"
        onChange={file => handleFileChosen(file.target.files[0])}
      />
    </div>
  );
};

ReadFile.propTypes = {
  handleFileChanged: PropTypes.func,
};

export default ReadFile;
