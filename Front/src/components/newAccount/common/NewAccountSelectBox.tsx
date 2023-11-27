import { MobileSort } from "../../../store/newAccount/atoms";

interface NewAccountSelectBoxProps {
  changeValue: (value: MobileSort) => void;
}

const NewAccountSelectBox = ({ changeValue }: NewAccountSelectBoxProps) => {
  const data = ["이동통신사를 선택하세요", "SK", "KT", "LG"];

  return (
    <select
      name="telecom h-[50px]"
      className="w-[100%] p-[10px] border-solid border-[3px] border-darkgray mb-[10px]"
      onChange={(event) => changeValue(event.target.value as MobileSort)}
    >
      {data.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default NewAccountSelectBox;
