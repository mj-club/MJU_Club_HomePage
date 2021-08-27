import React, { useState } from'react';
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { getUnionInfos } from '../../actions';
import '../Table/Table.css';
import '../Table/dropdown.css';

const TableItem = () =>{
  const dispatch = useDispatch();

  dispatch(getUnionInfos());

  {/*const userEmail = useSelector(state => state.authReducer.user_email);*/}


  const getQuestion = () => { // 영화 정보를 반환하는 함수
    const questions = [
      { No: 0, SUBJECT: "기생충", CATEGORY: "AA", writer: "JJJ",release: "2019-05-30" },
      { No: 1, SUBJECT: "라이온 킹", CATEGORY: "BB", writer: "III",release: "2019-07-17" },
      { No: 2, SUBJECT: "날씨의 아이", CATEGORY: "CC", writer: "HHH",release: "2019-10-31" },
      { No: 3, SUBJECT: "알라딘", CATEGORY: "DD", writer: "GGG",release: "2019-05-23" },
      { No: 4, SUBJECT: "나랏말싸미", CATEGORY: "AA", writer: "FFF",release: "2019-07-24" },
      { No: 5, SUBJECT: "주전장", CATEGORY: "BB", writer: "EEE",release: "2019-07-25" },
      { No: 6, SUBJECT: "어벤져스: 엔드게임", CATEGORY: "CC", writer: "DDD",release: "2019-04-24" },
      { No: 7, SUBJECT: "봉오동 전투", CATEGORY: "DD", writer: "CCC",release: "2019-08-07" },
      { No: 8, SUBJECT: "김복동", CATEGORY: "BB", writer: "BBB",release: "2019-08-08" },
      { No: 9, SUBJECT: "코코", CATEGORY: "CC", writer: "AAA",release: "2018-01-11" },
    ]
    return questions;
  }

  const [questions] = useState({ //정보를 담는 state
    data: getQuestion(),
    pageSize: 3 // 한 페이지에 보여줄 아이템개수
  });

  const { length: count } = questions.data;


  const filtered_question = (props)=>{
    if(props === null){
      return questions;
    }else{
      return (questions.data.filter(Quest=> Quest.CATEGORY === props).map(Quest => Quest.SUBJECT));
    }
  };


  return(
    <>
      <h1><span className="blue"></span> Q&A Table<span className="blue"></span></h1>

      <span>
        <select className="custom-dropdown">
            <option >동아리관련문의 </option>
            <option>서류문의</option>  
            <option>시설문의</option>
            <option>총동연관련문의</option>
            <option>기타문의</option>
            <option>전체문의</option>
        </select>

        <Link to ="/" className = "custom-button"><button onClick="location.href='write_post'" >글작성</button></Link>

      </span>
      <span>{count}개 data</span>
      <span>{filtered_question('AA')}</span>
      <table className="container">
        <thead>
          <tr>
            <th><h1>NO</h1></th>
            <th><h1>CATEGOTY</h1></th>
            <th><h1>SUBJECT</h1></th>
            <th><h1>WRITER</h1></th>
            <th><h1>DATE</h1></th>
          </tr>
        </thead>
        <tbody className = "body">
          {questions.data.map(datas =>
          <tr key={datas.No}>
            <td >{datas.No}</td>
            <td >{datas.CATEGORY}</td>
            <td className ="container_td_second-child"><Link to="/">{datas.SUBJECT}</Link></td>
            <td>{datas.writer}</td>
            <td>{datas.release}</td>
          </tr>
          )}
        </tbody>
      </table>
    </>
  );
};


export default TableItem;
