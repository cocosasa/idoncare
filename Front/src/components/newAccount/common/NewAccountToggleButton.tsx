type First = string;
type Second = string;
type IsLeft = boolean;
interface NewAccountToggleButtonProps {
  first: First;
  second: Second;
  isLeft: IsLeft;
  onChange: (data: boolean) => void;
}

const NewAccountToggleButton = ({
  first,
  second,
  isLeft,
  onChange,
}: NewAccountToggleButtonProps) => {
  return (
    <div className="flex w-[220px] h-[50px] ml-[10px] mb-[10px] text-m items-center">
      <p
        className={`${
          isLeft ? "bg-main text-white border-main" : "border-main border-solid text-darkgray"
        } border-[3px] h-full px-[1px] py-[10px] w-[50%] text-center`}
        onClick={() => onChange(true)}
      >
        {first}
      </p>
      <p
        className={`${
          !isLeft ? "bg-main text-white border-main" : "border-main border-solid text-darkgray"
        } border-[3px] h-full px-[1px] py-[10px] w-[50%] text-center`}
        onClick={() => onChange(false)}
      >
        {second}
      </p>
    </div>
  );
};

export default NewAccountToggleButton;
