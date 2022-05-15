import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import styled from 'styled-components';



let YellowBtn = styled.button`
  background: ${ props  => props.bg };
  color: black;
  padding: 10px;
`


function Detail(props){
  let [count, setCount] = useState(0)
  let [warn, setwarn] = useState(true)
  let [onlyNumber, setonlyNumber] = useState(true)
  
  let {id} = useParams();
  let usewerPick = props.shoes.find(function(x){
    return x.id == id
  })

  
  

  useEffect(()=>{
    let a = setTimeout(()=>{
      setwarn(false)
    }, 2000)

    return ()=> {
      clearTimeout(a)
    }
  }, [count])

  useEffect(()=>{
    let number = [onlyNumber];
    
    let whatnumber = isNaN(number);

    if( whatnumber == true ) {
      alert('숫자만입력하세요'); console.log('숫자아님')
    } else {console.log('숫자')}
    
  }, [onlyNumber])
  

  
  

  return (
      <div className="container">
        {
          alert == true
          ? <div className="alert alert-warning">
            2초 이내 구매시 할인</div>
          : null
        }
        
        {count}
        <button onClick={()=>{ setCount(count+1) }}></button>
        <YellowBtn bg="blue">버튼</YellowBtn>
        {/* 스타일드 컴포넌트로 만든거 */}
        <div className="row">
          <div className="col-md-6">
          <img src={
            'https://codingapple1.github.io/shop/shoes'
            + (usewerPick.id+1) +'.jpg'} width="100%" />
          </div>
          {onlyNumber}
          <input onChange={ (e)=>{ setonlyNumber(e.target.value); } } />
          <div className="col-md-6">
            <h4 className="pt-5">{usewerPick.title}</h4>
            <p>{usewerPick.content}</p>
            <p>{usewerPick.price}</p>
            <button className="btn btn-danger">주문하기</button> 
          </div>
        </div>
      </div> 
    )
}

export default Detail;