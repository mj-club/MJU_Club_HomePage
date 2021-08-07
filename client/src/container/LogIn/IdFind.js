import React from 'react';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import IdFindForm from '../../components/LogInForm/IdFindForm';
import WhiteBox from '../../components/WhiteBox/WhiteBox';

export default function IdFind() {
  return(
    <>
      <style>
        {`
          .LogInForm_hr{
            height:1px;
            margin:60px 0 50px 0;
            background:rgba(102,102,102,.2);
          }
          .LogInForm_foot-lnk{
            text-align:center;
          }
          #testtest{
            
          }
        `}
      </style>
      <WhiteBox
        Content={
          <>
            <SectionTitle
              titleOption="section-title text-center mb-7"
              headingOption="title fz-28"
              title="Email 찾기"
              subTitle=""
            />
            <IdFindForm/>
            <div className="LogInForm_hr"></div>
            <div className="LogInForm_foot-lnk">
              <div className='row'>
                <div className="col" data-aos="fade-up">
                  <a href="#forgot">뒤로가기</a>
                </div>
                <div className="col" data-aos="fade-up">
                  <a href="#forgot">PW 찾기</a>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}