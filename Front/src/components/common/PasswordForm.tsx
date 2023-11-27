import React from 'react';
import PasswordTop from '../password/PasswordTop';
import PasswordInput from '../password/PasswordInput';

interface Props {
  password: string;
  handleSetPassword: (newPassword: string) => void;
}

const PasswordForm: React.FC<Props> = ({ password, handleSetPassword }) => {
  return (
    <div className="flex flex-col">
      <div className="flex-grow pt-60">
        <PasswordTop password={password} />
        <PasswordInput password={password} onPasswordChange={handleSetPassword} />
      </div>
    </div>
  );
};

export default PasswordForm;
