import React from 'react'
import { Link } from 'react-router-dom';

type KidAddProps = {
  className?: string;
}

const KidAdd: React.FC<KidAddProps> = ({ className }) => {
  return (
    <div className={`m-3 ${className}`}>
      <Link to="/kidRegist">
        <img src={"/icons/circle-plus.png"} alt="icon" />
      </Link>
    </div>
  )
}

export default KidAdd
