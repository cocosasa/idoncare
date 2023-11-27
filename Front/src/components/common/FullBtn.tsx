import { Link } from "react-router-dom";

type ButtonText = string;
type ButtonLink = string;

interface FullBtnProps {
  buttonText?: ButtonText;
  buttonLink?: ButtonLink;
  className?: string;
  isDone?: boolean;
  onClick?: () => void;
}

const FullBtn: React.FC<FullBtnProps> = ({
  buttonText = "확인",
  buttonLink = "",
  className = "",
  isDone = true,
  onClick,
}) => {
  
    const handleClick = (e: React.MouseEvent) => {
        if (!isDone || (buttonLink === "" && onClick)) {
            e.preventDefault();
            if(onClick) onClick();
        }
    };

    const buttonContent = (
        <div className={`p-3 rounded-xl text-center text-m mt-auto mb-6 ${isDone ? 'bg-main' : 'bg-mediumgray'}`}>
            <span className="text-white">{buttonText}</span>
        </div>
    );

    return (
        <div className={`max-w-full ${className}`}>
            {isDone 
                ? (<Link to={buttonLink} onClick={handleClick}>{buttonContent}</Link>) 
                : (<div>{buttonContent}</div>)
            }
        </div>
    );
};

export default FullBtn;
