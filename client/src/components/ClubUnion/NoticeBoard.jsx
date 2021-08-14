import React from 'react';
import {useDispatch, useSelector } from "react-redux";
import { getUnionInfos } from '../../actions';

//Todo
//club_union_noticeboard -> union_info
//ClubUnion => Union

const NoticeBoard = () => {

  const dispatch = useDispatch();

  dispatch(getUnionInfos());
  
  const infos = useSelector(state => state.authReducer.union_infos);

  const printRows = () => {
    console.log(infos);
  }

  return (
    <>
    <style type="text/css">
      {`
      .col-10 {
        text-align : center;
      }
      `}
    </style>
    <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col" className="col-10">내용</th>
        <th scope="col">작성자</th>
        <th scope="col">날짜</th>
      </tr>
    </thead>
    <tbody>
      {
        printRows()
      }
    </tbody>
  </table> 
</>
  );
};

export default NoticeBoard;