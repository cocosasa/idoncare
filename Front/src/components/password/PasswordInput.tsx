import React from 'react';
import Number from '../pocketmoney/Number';

interface Props {
  password: string;
  onPasswordChange: (newPassword: string) => void;
}

const PasswordInput: React.FC<Props> = ({ password, onPasswordChange }) => {
  const handleNumberClick = (num: number | string) => {
    if (typeof num === 'number') {
      if (password.length < 6) {
        onPasswordChange(password + num.toString());
      }
    }
  };

  const handleClear = () => {
    onPasswordChange('');
  };

  const handleBackspace = () => {
    onPasswordChange(password.slice(0, -1));
  };

   return (
     <div>
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

export default PasswordInput;
