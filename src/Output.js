import React, { useEffect, useState } from 'react';

function Output (props) {
    const [showAllNumbers, setShowAllNnumbers] = useState(false);
    const {outputArr, numbersHashMap} = props;

    const removeDuplicates = (arr) => {
        const hm = {};
        arr.forEach((value) => {
            hm[value] = value;
        });
        return Object.keys(hm);
    }

    const newNumbers = removeDuplicates(outputArr[0]).join(',');
    const existingNumbers = removeDuplicates(outputArr[1]).join(',');

    const renderAllNumbers = () => {
        if (!showAllNumbers) {return;}
        const numbers = Object.keys(numbersHashMap).join(',');
        return (
        <p>{numbers}</p>
        );
    };

    const handleClick = () => {
        setShowAllNnumbers(true);
    };

    const renderViewList = () => {
        if (Object.keys(numbersHashMap).length) {
            return <span onClick={handleClick}>(View List)</span>;
        }
    };

    const renderNewNumbers = () => {
        if (newNumbers.length) {
            return (
            <p>{newNumbers} have been added to the list {renderViewList()}</p>
            );
        }
    }

    const renderExistingNumbers = () => {
        if (existingNumbers.length) {
            return (
                <p>{existingNumbers} already exist</p>
            );
        }
    }

    return (
        <div>
            {renderExistingNumbers()}
            {renderNewNumbers()}
            {renderAllNumbers()}
        </div>
    );
}

export default Output;
