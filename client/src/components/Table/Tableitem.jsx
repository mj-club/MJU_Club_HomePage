import PropTypes from "prop-types";
import React from'react';
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { getUnionInfos } from '../../actions';
import '../Table/Table.css';
import '../Table/dropdown.css';

const TableItem = () =>{
  const dispatch = useDispatch();

  dispatch(getUnionInfos());

{/*const userEmail = useSelector(state => state.authReducer.user_email);*/}

  const datas = 
    { 
    NO: "111",
    title: "title",
    writer: "AAA",
    DATE: "CCC",
    CATEGORY: "ETC"
    }
  
  return(
    <>
      <h1><span className="blue"></span> Q&A Table<span className="blue"></span></h1>

      <span>
        <select className="custom-dropdown">
            <option>동아리관련문의</option>
            <option>서류문의</option>  
            <option>시설문의</option>
            <option>총동연관련문의</option>
            <option>기타문의</option>
        </select>

        <Link to ="/" className = "custom-button"><button onClick="location.href='write_post'" >글작성</button></Link>
        
      </span>

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
          <tr>
            <td>{datas.NO}</td>
            <td>{datas.CATEGORY}</td>
            <td className ="container_td_second-child"><Link to="/">{datas.title}</Link></td>
            <td>{datas.writer}</td>
            <td>{datas.DATE}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

TableItem.propTypes = {
  data: PropTypes.object
};

export default TableItem;