import { useEffect, useState } from "react";
import Img1 from "../../assets/imgs/profile/부모1.png";
import Img2 from "../../assets/imgs/profile/부모2.png";
import Img3 from "../../assets/imgs/profile/부모3.png";
import Img4 from "../../assets/imgs/profile/부모4.png";
import Img5 from "../../assets/imgs/profile/부모5.png";
import Img6 from "../../assets/imgs/profile/아이1.png";
import Img7 from "../../assets/imgs/profile/아이2.png";
import Img8 from "../../assets/imgs/profile/아이3.png";
import Img9 from "../../assets/imgs/profile/아이4.png";
import Img10 from "../../assets/imgs/profile/아이5.png";

type ProfileName = string;
type ProfileImage = string;

interface ProfileProps {
  profileName: ProfileName | undefined;
  profileImage?: ProfileImage;
  size?: "xsmall" | "small" | "medium" | "large";
  type?: string;
}

const profileImages = [
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7,
  Img8,
  Img9,
  Img10,
];

const ProfileSize = {
  xsmall: 50,
  small: 60,
  medium: 80,
  large: 120,
};

const Profile = ({
  profileName,
  // profileImage,
  size = "large",
  type = "CHILD",
}: ProfileProps) => {
  const [ranNum, setRanNum] = useState(0);

  useEffect(() => {
    setRanNum(Math.floor(Math.random() * 5));
  }, []);
  return (
    <div className="flex flex-col items-center justify-around w-full">
      <img
        className={`h-[${ProfileSize[size]}px] rounded-full`}
        src={profileImages[type == "PARENT" ? ranNum : ranNum + 5]}
        alt="프로필 이미지"
      />
      <p className="text-main font-strong text-m">{profileName}</p>
    </div>
  );
};

export default Profile;
