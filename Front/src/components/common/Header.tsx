import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

type PageTitle = string;
type HeaderType = "normal" | "x" | "simple";
type HeaderLink = string | "back";

interface HeaderProps {
  pageTitle: PageTitle;
  headerType?: HeaderType;
  headerLink?: HeaderLink;
}

const Header = ({ pageTitle, headerType = "normal", headerLink = "back" }: HeaderProps) => {
  const navigate = useNavigate();
  const handleLink = () => {
    if (headerLink == "back") {
      navigate(-1);
    } else {
      navigate(headerLink);
    }
  };
  return (
    <ul className="flex items-center justify-between w-full h-[60px]">
      {headerType === "normal" ? (
        <>
          <li className={`text-[40px]`}>
            <button onClick={handleLink}><Icon className="ml-8" name={'arrow-left'}/></button>
          </li>
          <li className="text-l">{pageTitle}</li>
          <li className={`text-[40px] text-transparent`}>X</li>
        </>
      ) : (
        <>
          <li className={`text-x text-transparent`}>&lt;</li>
          <li className={`text-x`}>
            <button onClick={handleLink}>X</button>
          </li>
        </>
      )}
    </ul>
  );
};

export default Header;
