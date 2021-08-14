import React , {useState} from 'react';
import {useDispatch, useSelector } from "react-redux";
//Todo
//club_union_noticeboard -> union_info


const NoticeBoard = () => {

  const dispatch = useDispatch();

  dispatch(getUnionInfos());
  
  const Infos = useSelector(state => state.authReducer.union_infos);

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
        //infos를 돌면서 row를 달아줌
      }
    </tbody>
  </table> 
</>
  );
};

export default NoticeBoard;