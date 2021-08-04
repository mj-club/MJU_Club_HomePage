import React from 'react';

import Page from '../components/Page';
import Ipsum from '../components/Ipsum';
import MenuExampleCompact from '../components/menubars/Moviebar';
import SubMenu from '../components/Submenu';
import PageTitle from '../components/PageTitle';
import CardExampleFluid from '../components/CardEample';
import RightTitle from '../components/RightTitle';
import Pagination_Month from './Pagination_mp';

export default function DocumentPage() {
  const title=<PageTitle title={"Document"}/>
  const rightmenu =<MenuExampleCompact/>
  const rightInner = <CardExampleFluid />
  const rightPagination=<Pagination_Month />
  return(
     <Page rightInner={rightInner} rightmenu = {rightmenu} rightTitle = {title} rightPagination ={rightPagination}/>
  );
}