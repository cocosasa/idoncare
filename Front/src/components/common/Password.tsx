import React, { useState } from 'react';
// import Header from "../common/Header";
import Number from '../pocketmoney/Number';
import FullBtn from './FullBtn';

interface Props {
  onNext?: () => void;
  content1?: string;
  content2?: string;
}

const PasswordForm: React.FC<Props> = ({ onNext, content1 = '아이돈케어', content2 = '비밀번호를 눌러주세요.' }) => {
  const [inputValue, setInputValue] = useState('');

  const handleNumberClick = (num: number | string) => {
    if (typeof num === 'number') {
      setInputValue((prevState) => {
        if (prevState.length < 6) {
          return prevState + num.toString();
        }

        return prevState;
      });
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleBackspace = () => {
    setInputValue((prevState) => prevState.slice(0, -1));
  };

   const formatInputValue = (value: string) => {
    let result = '';
    for(let i=0; i<6; i++) {
      if(i < value.length){
        result += '<span class="text-main">*</span>';
      } else{
        result += '<span class="text-mediumgray">*</span>';
      }
    }
    return result;
  };

   return (
    <div className="flex flex-col h-screen pb-60">
      {/* <Header pageTitle="" headerType="x" headerLink="/" /> */}
      <div className="flex-grow pt-60">

        <div className="text-center text-l mb-16">
          {content1}<br/>
          {content2}
          </div>

        <div className="text-l text-center font-strong mb-24" 
        dangerouslySetInnerHTML={{ __html: formatInputValue(inputValue)}} />

       <Number
         bottomLeftText="CLR"
         bottomRightText="<-"
         onNumberClick={handleNumberClick}
         onLeft={handleClear}
         onRight={handleBackspace}
       />

      </div>
      <FullBtn onClick={onNext}/>
     </div>
   );
};

export default PasswordForm;
