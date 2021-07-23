import React from 'react';

import Page from '../components/Page';
import RightTitle from '../components/RightTitle';
import Ipsum from '../components/Ipsum';

export default function AboutPage() {
  const title="키움 이모저모"
  const rightTitle = <RightTitle 
            title={title}
            menu1={"HOME"}
            menu2={"멤버십"}
            menu3={title}
          />
  const rightInner = <Ipsum title={title}></Ipsum>

  return(
     <Page rightInner={rightInner} rightTitle={rightTitle}/>
  );
}