import React from 'react';

import Page from '../../components/Page';
import RightTitle from '../../components/RightTitle';
import Ipsum from '../../components/Ipsum';

export default function BulletinBoardPage() {
  const title="자유 게시판";
  const rightTitle = <RightTitle 
            title={title}
            menu1={"키움 이모저모"}
            menu2={title}
            menu3={"목록"}
          />
  const rightInner = <Ipsum title={title}></Ipsum>

  return(
    <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}