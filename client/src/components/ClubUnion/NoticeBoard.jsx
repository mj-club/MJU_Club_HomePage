import React from 'react';
import {useDispatch, useSelector } from "react-redux";
import { getUnionInfos } from '../../actions';
import BoardItem from './BoardItem';

//Todo
//club_union_noticeboard -> union_info
//ClubUnion => Union
//unionActions.js => postAction.js
//unionReducer.js => postReducer.js
//WorkContainer.js => UnionNoticeContainer
// /write_post

const NoticeBoard = () => {

  const dispatch = useDispatch();

  dispatch(getUnionInfos());
  
  // const infos = useSelector(state => state.authReducer.union_infos);
  const userEmail = useSelector(state => state.authReducer.user_email);
  
  const datas = [{
    title : "title",
    content : "content",
    writer : "총동연",
    date : "2021-03-01",
  }];

  
  return (
    <>
    <style type="text/css">
      {`
      .col-10 {
        text-align : center;
      }

      .text-end{
        text-align : right;
      }
      `}
    </style>
    {//이렇게 하드코딩해도되는것..?
    userEmail==="mjuclubkeyum@gmail.com" &&
      <div className="text-end mb-3">
        <button className="btn btn-primary" onClick="location.href='write_post'" >글작성</button>
      </div>
    }
    
    <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col" className="col-10">내용</th>
        <th scope="col">작성자</th>
        <th scope="col">날짜</th>
      </tr>
    </thead>
    <tbody id="tbody">
      {
        datas.map((data, index) => (<BoardItem key={index} id={index} title={data.title} writer={data.writer} date={data.date} />))
      }
    </tbody>
  </table> 
</>
  );
};

export default NoticeBoard;