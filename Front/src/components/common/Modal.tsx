import React, { ReactNode } from "react";

interface BottomModalProps {
  children: ReactNode;
}

const BottomModal: React.FC<BottomModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black opacity-50 absolute inset-0"></div>
      <div className="relative w-full max-w-md mx-auto py-4 px-6 bg-white rounded shadow-lg z-10">
        {children}
      </div>
    </div>
  );
};

export default BottomModal;
