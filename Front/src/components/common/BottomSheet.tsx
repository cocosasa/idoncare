import React, { ReactNode } from "react";
import { BottomSheetOpen } from './../../store/common/atoms';
import { useRecoilState } from "recoil";

interface BottomSheetProps {
  children: ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useRecoilState(BottomSheetOpen);

  const handleCloseSheet = () => {
    setBottomSheetOpen(false);
  };
  const height = `h-[70vh]`;
  return (
    <div
      className={`fixed inset-0 h-screen items-center justify-center z-50 flex overflow-y-auto ${
        bottomSheetOpen ? "" : "hidden"
      }`}
    >
      <div
        className="bg-black opacity-50 absolute inset-0"
        onClick={handleCloseSheet}
      ></div>
      <div
        className={`fixed bottom-0 ${height} w-full mx-auto py-1 px-6 bg-white rounded-t-3xl shadow-lg z-10 `}
      >
        <div className="flex w-full justify-center bg-white items-center h-14">
          <div className="relative top-2 w-[30vw] rounded-full bg-gray h-4"></div>
        </div>
        <div className={`${height} overflow-y-auto p-2`}>{children}</div>
      </div>
    </div>
  );
};
