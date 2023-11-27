import { useState } from "react";
import FullBtn from "../common/FullBtn";
import NewAccountCheckBox from "./common/NewAccountCheckBox";
import NewAccountHeader from "./common/NewAccountHeader";
import NewAccountInput from "./common/NewAccountInput";
import NewAccountSelectBox from "./common/NewAccountSelectBox";
import NewAccountToggleButton from "./common/NewAccountToggleButton";
import { NewAccountCreate } from "../../types/NewAccountCreateProps";
import axios from "axios";
import { userToken } from "../../store/common/selectors";
import { useRecoilState, useRecoilValue } from "recoil";
import { MobileSort, authenticationData } from "../../store/newAccount/atoms";
import { baseUrl } from "../../apis/url/baseUrl";
import AxiosHeader from "../../apis/axios/AxiosHeader";

const NewAccountUserInfo = ({ onChangeStep, step }: NewAccountCreate) => {
  const [serviceAgree, setServiceAgree] = useState(false);
  const [privateAgree, setPrivateAgree] = useState(false);
  const [local, setLocal] = useState(true);
  const [gender, setGender] = useState(true);
  const handleServiceAgree = () => setServiceAgree(!serviceAgree);
  const handlePrivateAgree = () => setPrivateAgree(!privateAgree);
  const handleLocal = (data: boolean) => setLocal(data);
  const handleGender = (data: boolean) => setGender(data);

  const token = useRecoilValue(userToken);
  const [authenticationRecoilData, setAuthenticationData] =
    useRecoilState(authenticationData);

  const [errorMsg, setErrorMessage] = useState("");

  const handleInputName = (value: string | number) => {
    setAuthenticationData({
      ...authenticationRecoilData,
      name: value as string,
    });
  };
  const handleInputBirth = (value: string | number) => {
    setAuthenticationData({
      ...authenticationRecoilData,
      birth: value as number,
    });
  };
  const handleInputPhoneNumber = (value: string | number) => {
    setAuthenticationData({
      ...authenticationRecoilData,
      phoneNumber: value as number,
    });
  };
  const handleSelectMobileSort = (value: MobileSort) => {
    setAuthenticationData({
      ...authenticationRecoilData,
      mobileSort: value,
    });
  };

  const userAuthentication = () => {
    console.log({
      phoneNumber: authenticationRecoilData.phoneNumber,
      birth: authenticationRecoilData.birth,
      mobileSort: authenticationRecoilData.mobileSort,
      name: authenticationRecoilData.name,
    });

    axios
      .post(
        baseUrl + `api/account/auth`,
        {
          phoneNumber: authenticationRecoilData.phoneNumber,
          birth: authenticationRecoilData.birth,
          mobileSort: authenticationRecoilData.mobileSort,
          name: authenticationRecoilData.name,
        },
        AxiosHeader({ token })
      )
      .then((res) => {
        console.log(res.data);
        if (!(res.data.code == 200 || res.data.code == 409)) {
          setErrorMessage("본인 정보를 확인해주세요.");
          return;
        }
        setErrorMessage("");
        onChangeStep(2);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("본인 정보를 확인해주세요.");
      });
  };

  return (
    <div className="flex flex-col text-m">
      <NewAccountHeader step={step} />
      <p className="text-s mb-[10px]">제공되는 정보 : 성명, 연계정보(CI)값</p>
      <div className="flex items-center text-m">
        <NewAccountInput
          placeholder="성명"
          value={authenticationRecoilData.name}
          changeValue={handleInputName}
        />
        <NewAccountToggleButton
          first="내국인"
          second="외국인"
          isLeft={local}
          onChange={handleLocal}
        />
      </div>
      <div className="flex items-center text-m">
        <NewAccountInput
          placeholder="생년월일(8자리)"
          value={authenticationRecoilData.birth}
          changeValue={handleInputBirth}
        />
        <NewAccountToggleButton
          first="남"
          second="여"
          isLeft={gender}
          onChange={handleGender}
        />
      </div>
      <NewAccountInput
        placeholder="휴대폰번호(숫자만)"
        value={authenticationRecoilData.phoneNumber}
        changeValue={handleInputPhoneNumber}
      />
      <NewAccountSelectBox changeValue={handleSelectMobileSort} />
      <NewAccountCheckBox
        text="서비스 이용 및 개인정보처리 동의"
        isCheck={serviceAgree}
        onToggle={handleServiceAgree}
      />
      <NewAccountCheckBox
        text="개인정보 제3자 제공 동의"
        isCheck={privateAgree}
        onToggle={handlePrivateAgree}
      />
      <div
        onClick={() => {
          userAuthentication();
        }}
      >
        {errorMsg && <div className="text-center text-red-600">{errorMsg}</div>}
        <FullBtn buttonText="다음" isDone={serviceAgree && privateAgree} />
      </div>
    </div>
  );
};

export default NewAccountUserInfo;
