import React, { useState, useEffect } from 'react';
import Number from '../pocketmoney/Number';

type KidPhoneFormProps = {
  onPhoneNumberChange: (phoneNumber: string) => void;
};

const KidPhoneForm: React.FC<KidPhoneFormProps> = ({ onPhoneNumberChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleNumberClick = (num: number | string) => {
    if (typeof num === 'number') {
      let numericValue = inputValue.replace(/[^0-9]/g, '');
      if (numericValue.length < 11) {
        numericValue += num.toString();
        setInputValue(numericValue);
      }
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleBackspace = () => {
    setInputValue((prevState) => {
      return prevState.slice(0, -1);
    });
  };

  const formatInputValue = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length >= 4 && numericValue.length < 7) {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    } else if (numericValue.length >= 7) {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7)}`;
    }
    return numericValue;
  };

  useEffect(() => {
    onPhoneNumberChange(inputValue.replace(/[^0-9]/g,''));
  }, [inputValue, onPhoneNumberChange]);

  return (
    <div>
      <div className="text-l text-center text-main font-strong mb-24">
        {inputValue ? formatInputValue(inputValue) : '　'}
      </div>

      <Number
        bottomLeftText="CLR"
        bottomRightText="<-"
        onNumberClick={handleNumberClick}
        onLeft={handleClear}
        onRight={handleBackspace}
      />
    </div>
  );

  
};

export default KidPhoneForm;