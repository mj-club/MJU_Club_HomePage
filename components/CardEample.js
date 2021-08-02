import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'


const CardExampleFluid = () => (
  <>
    <Card border="info" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title><Link to ="/Document_연습실1">연습실1 대관 신청서</Link></Card.Title>
          <Card.Text>
            연습실1(본관지하) 대관 신청서 양식입니다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button><Link to="/Document_연습실1"><Icon name='download'/></Link></button>
          </Card.Text>
        </Card.Body>
        <Card.Header>2021-07-31 | 관리자1</Card.Header>
    </Card>
    <br/>

    <Card border="info" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title><Link to ="/Document_연습실1">동아리 폐지 신청서</Link></Card.Title>
          <Card.Text>
            동아리 폐지 신청서 양식입니다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button><Link to="/Document_폐지"><Icon name='download'/></Link></button>
          </Card.Text>
        </Card.Body>
        <Card.Header>2021-07-30 | 관리자1</Card.Header>
    </Card>
    <br/>

    <Card border="info" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title><Link to ="/Document_연습실1">동아리방 이전 신청서</Link></Card.Title>
          <Card.Text>
            동아리방 이전 신청서 양식입니다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button><Link to="/Document_동아리방"><Icon name='download'/></Link></button>
          </Card.Text>
        </Card.Body>
        <Card.Header>2021-07-30 | 관리자1</Card.Header>
    </Card>
    <br/>

    <Card border="info" style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title><Link to ="/Document_연습실1">동아리 신규등록</Link></Card.Title>
          <Card.Text>
            동아리 신규등록 양식입니다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button><Link to="/Document_신규등록"><Icon name='download'/></Link></button>
          </Card.Text>
        </Card.Body>
        <Card.Header>2021-07-30 | 관리자1</Card.Header>
    </Card>
    <br/>
    
  </>
)

export default CardExampleFluid