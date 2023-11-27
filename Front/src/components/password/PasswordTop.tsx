import React from 'react';

interface Props {
  password: string;
  content1?: string;
  content2?: string;
}

const PasswordTop: React.FC<Props> = ({ password, content1 = '아이돈케어', content2 = '비밀번호를 눌러주세요.' }) => {

  const formatInputValue = (value: string) => {
    let result = '';
    for(let i=0; i<6; i++) {
      if(i < value.length){
        result += '<span class="text-main">*</span>';
      } else{
        result += '<span class="text-mediumgray">*</span>';
      }
    }
    return result;
  };

  return (
    <div>
      <div className="text-center text-l mb-16">
          {content1}<br/>
          {content2}
          </div>

      <div className="text-l text-center font-strong mb-24" 
        dangerouslySetInnerHTML={{ __html: formatInputValue(password)}} />
    </div>
   );
};

export default PasswordTop;
