import React, { useState } from "react";

interface Props {
  onMessageChange: (message: string) => void;
}

const MsgBox: React.FC<Props> = ({ onMessageChange }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = event.target.value;
    setMessage(newMessage);
    onMessageChange(newMessage);
  };

  return (
    <div className="bg-gray p-14 rounded-xl mt-5 text-s text-center">
      <div className="flex justify-center items-center">
        <img src="/icons/icon-emoji-1.png" alt="Icon" className="w-32 h-32" />
      </div>
      <div className="bg-white rounded-lg pt-4 pb-4 mt-10 w-full overflow-hidden">
        <textarea
          value={message}
          onChange={handleInputChange}
          placeholder="하고싶은 말을 적어주세요."
          className="text-darkgray text-center outline-none"
        />
      </div>
    </div>
  );
};

export default MsgBox;
