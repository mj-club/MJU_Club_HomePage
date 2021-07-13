import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Loginmenu = (props) => {
  return (
    <div>
      <ListGroup style={{width: "40%"}}>
        <ListGroupItem disabled tag="button" action style={{background: "#fcd93f", textAlign:"center", fontSize:"xlarge"}}>멤버십</ListGroupItem>
        <ListGroupItem tag="button" action style ={{textAlign: "center"}}><a href="/">로그인   &gt;</a></ListGroupItem>
        <ListGroupItem tag="button" action style ={{textAlign: "center"}}><a href ="/">회원가입  &gt;</a></ListGroupItem>
        <ListGroupItem tag="button" action style ={{textAlign: "center"}}><a href ="/">ID/PW찾기  &gt;</a></ListGroupItem>
      </ListGroup>
    </div>
  );
}

export default Loginmenu;