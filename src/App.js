import './App.css';

import React, { useState, useEffect } from 'react';
import Output from './Output';



const numbersHashMap = JSON.parse(localStorage.getItem('savedNumbers')) || {};
let changeTimeout = null;

function App() {
  const [value, setValue] = useState('');
  const regex = /^[\d ,-]*$/;
  const [outputArr, setOutputArr] = useState([[], []]);

  useEffect(() => {
    if (changeTimeout) {
      clearTimeout(changeTimeout);
    }
    changeTimeout = setTimeout(() => {
      handleClick();
    }, 500);
  }, [value])

  const handleKeyDown = (e) => {

  };

  const handleChange = (e) => {
    const key = e.target.value;
    if (!regex.test(key)) {
      e.preventDefault();
      return false;
    } else {
      setValue(key);
    }
  };


  const handleClick = () => {
    const numberArr = value.split(',').map((value) => value.replace(' ', ''));
    createNumbers(numberArr);
  }

  const createNumbers = (arr) => {
    let tempOutputArr = [[], []];

    arr.forEach(value => {
      const rangeArr = value.split('-');
      if (rangeArr.length > 1 && Number(rangeArr[0]) < Number(rangeArr[1])) {
        for (let i = Number(rangeArr[0]); i <= Number(rangeArr[1]); ++i) {
          console.log(i);
          tempOutputArr = checkExistingOrNew(i, tempOutputArr[0], tempOutputArr[1]);
          if (i) {numbersHashMap[i] = i;}
        }
      } else if (rangeArr.length == 1) {
        tempOutputArr = checkExistingOrNew(value, tempOutputArr[0], tempOutputArr[1]);
        if (value) {numbersHashMap[value] = value;}
      }
    });

    // localStorage.setItem('savedNumbers', JSON.stringify(numbersHashMap));
    // console.log('new numbers', tempOutputArr[0]);
    // console.log('existing numbers', tempOutputArr[1]);
    // console.log('hashmap', numbersHashMap);
    setOutputArr(tempOutputArr);
  }

  const checkExistingOrNew = (value, newNumbers, existingNumbers) => {
    if (numbersHashMap[value]) {
      existingNumbers.push(value);
    } else {
      newNumbers.push(value);
    }

    return [newNumbers, existingNumbers];
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={value} onKeyDown={handleKeyDown} onChange={handleChange} />
        <button onClick={handleClick} >Submit</button>

        <Output outputArr={outputArr} numbersHashMap={numbersHashMap} />
      </header>
    </div>
  );
}

export default App;
