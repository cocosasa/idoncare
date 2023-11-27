import { Link } from "react-router-dom";

type ButtonText = string;
type ButtonLink = string;

interface YesNoBtnProps {
  yesText?: ButtonText;
  noText?: ButtonText;
  yesLink?: ButtonLink;
  noLink?: ButtonLink;
  className?: string;
  onYesClick?: () => void;
  onNoClick?: () => void;
}

const YesNoBtn: React.FC<YesNoBtnProps> = ({
  yesText = "수락",
  noText = "거절",
  yesLink = "",
  noLink = "",
  className = "",
  onYesClick,
  onNoClick,
}) => {
  const handleYesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onYesClick) {
      onYesClick();
    }
  };

  const handleNoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (noLink === "" && onNoClick) {
      e.preventDefault();
      onNoClick();
    }
  };

  return (
    <div className={`flex mt-auto ${className}`}>
      <div className="flex justify-between w-full mt-10">
        <Link
          to={noLink}
          onClick={handleNoClick}
          className={`block ${className}`}
        >
          <div className="inline-block w-48 p-4 mr-5 text-black bg-mediumgray rounded-3xl text-s text-center">
            {noText}
          </div>
        </Link>
        <Link
          to={yesLink}
          onClick={handleYesClick}
          className={`block ${className}`}
        >
          <div className="inline-block w-48 p-4 text-white bg-main rounded-3xl text-s text-center">
            {yesText}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default YesNoBtn;
