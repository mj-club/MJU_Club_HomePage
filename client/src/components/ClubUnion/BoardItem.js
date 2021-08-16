import React from 'react';
import PropTypes from 'prop-types';

const BoardItem = ({id, title, writer, date}) => {
  return(
    <>
    <tr>
      <td scope="col">{id}</td>
      <td scope="col">{title}</td>
      <td scope="col">{writer}</td>
      <td scope="col">{date}</td>
    </tr>
    </>
  );
}

//propTypes설정해주기
BoardItem.propTypes = {
  id: PropTypes.any,
  title: PropTypes.any,
  writer : PropTypes.any,
  date : PropTypes.any,
};

export default BoardItem;