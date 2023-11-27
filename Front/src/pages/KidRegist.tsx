import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import KidPhoneForm from "../components/connect/KidPhoneForm";
import FullBtn from "../components/common/FullBtn";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userToken } from "../store/common/selectors";
import AxiosHeader from "../apis/axios/AxiosHeader";
import { baseUrl } from "../apis/url/baseUrl";
import BottomNav from "../components/common/BottomNav";
import Modal from "../components/common/Modal";

const KidRegist: React.FC = () => {
  const token = useRecoilValue(userToken);
  const [childPhoneNumber, setChildPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChildPhoneNumberSubmit = async () => {
    try {
      const response = await axios.post(
        baseUrl + `api/relationship/request`,
        { childPhoneNumber: String(childPhoneNumber) },
        AxiosHeader({ token })
      );

      console.log(response.data);
      console.log(childPhoneNumber);

      setModalMessage("요청이 전송되었습니다.");
      setModalIsOpen(true);
      // navigate("/");
    } catch (error) {
      console.error(error);
      console.log(childPhoneNumber);

      setModalMessage("오류가 발생하였습니다.");
      setModalIsOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header pageTitle="자녀 등록" headerType="normal" headerLink="/" />

      <div className="flex-grow">
        <div className="text-m text-center mt-48 mb-16">
          자녀의 전화번호를 입력해주세요.
        </div>
        <KidPhoneForm onPhoneNumberChange={setChildPhoneNumber} />

        {/* Move the modal component here */}
        {modalIsOpen && (
          <Modal>
            <div className="text-m m-16">{modalMessage}</div>
            <FullBtn
              buttonText="확인"
              onClick={() => {
                setModalIsOpen(false);
                if (modalMessage === "요청이 전송되었습니다.")
                  navigate("/");
              }}
            />
          </Modal>
        )}
      </div>

      {/* Button to submit phone number */}
      <FullBtn buttonText="등록" onClick={handleChildPhoneNumberSubmit} />

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

export default KidRegist;
