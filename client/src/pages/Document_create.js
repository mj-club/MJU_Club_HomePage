import React from 'react'

import CreateForm from '../components/Board/CreateForm';
import Page from '../components/Page';
import Ipsum from '../components/Ipsum';
import MenuExampleCompact from '../components/menubars/Moviebar';
import SubMenu from '../components/Submenu';
import PageTitle from '../components/PageTitle';
import CardExampleFluid from '../components/CardEample';
import RightTitle from '../components/RightTitle';
import Pagination_Month from './Pagination_mp';
import Detail from '../components/Board/Detail';

export default function Document_create({history, location}) {
  console.log(history);
  console.log(location);
  
  const title=<PageTitle title={"게시물등록"}/>
  const rightInner = <CreateForm />
  return(
     <Page rightInner={rightInner}rightTitle = {title} />
  );
}
