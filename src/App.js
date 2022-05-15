/* eslint-disable */ //터미널에 노란색 경고 안보기

import React, {useState} from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import {Routes,Route,Link,useNavigate,Outlet} from 'react-router-dom';
import Detail from './routes/Detail.js';
import axios from 'axios';

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [dataCount, setdataCount] = useState(0);
  let [disable, setDisable] = useState(false);
  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Shoe shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
              <Nav.Link onClick={()=>{ navigate('/detail/0') }}>Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
      
      
      <Routes>
        <Route path="/" element={
          //div태그 하나로 묶어줘야하는데 div태그 보기 싫을때
           <>
            <div className='mainbox'><h1>shop react 연습하기</h1></div>
            <div className="container">
              <div className="row">
                {/* map함수로 shoes의 array만큼 반복시키기 */}
                {
                  shoes.map((a, i)=>{
                    return <Card shoes={ shoes[i] } i={i} key={i}/>
                  })
                }
              </div>
            </div> 
            <button disabled={disable} onClick={()=>{

              // console.log(disable)
              // setDisable(false);
              axios.get('https://codingapple1.github.io/shop/data2.json').then((result)=>{
                
                let copy = [...shoes, ...result.data];
                shoes변경(copy);
              })
              .catch(()=>{
                console.log('실패')
              })
              setdataCount(dataCount+1);
              console.log(dataCount)
              if( dataCount == 1 ){
                axios.get('https://codingapple1.github.io/shop/data3.json').then((result)=>{
                  let copy = [...shoes, ...result.data];
                  shoes변경(copy);
                })
              } else if ( dataCount == 2 ){
                setDisable(true);
              }
            }}>더보기</button>
         </>
        }></Route>
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>} />
        <Route path="/about" element={<About/>} >
          <Route path="member" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="location" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
      </Routes>

      

    </div>
  );
  //return
}
// App.js

function About(){
  return(
    <div>
      <h3>오늘의 이벤트</h3>
      <Outlet></Outlet>
    </div>
  )
}


// shoes item 컴포넌트화
function Card(props){
  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg' } width="100%"></img>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>
    </div>
  )
}


export default App;
