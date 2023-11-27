type Placeholder = string;

interface NewAccountInputProps {
  placeholder: Placeholder;
  changeValue : (value: string | number) => void;
  value : string | number | null | undefined;
}

const NewAccountInput = ({
  placeholder,
  value,
  changeValue,
}: NewAccountInputProps) => {
  return (
    <input
      type={"text"}
      size={20}
      placeholder={placeholder}
      className="w-full border-solid border-[3px] p-[10px] border-darkgray mb-[10px]"
      value={value? value : ''}
      onChange={(e) => changeValue(e.target.value)}
    />
  );
};

export default NewAccountInput;
