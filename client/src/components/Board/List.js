import React from 'react';
import { Table } from 'react-bootstrap';

export default function List() {

  return(
    <Table bordered hover>
      <thead>
        <tr>
          <th>글 번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>

        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        
      </tbody>
    </Table>
  );
}