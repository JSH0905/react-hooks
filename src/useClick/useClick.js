import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const useClick = (onClick) => {
  const element = useRef();

  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);

  if (typeof onClick !== "function") {
    return;
  }

  return element;
};

const App = () => {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);

  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// 작동 순서
// 1. componentWillMount
// : reder 전에 componentWillMount 실행, => element 의 click 이벤트 없애줌

// 2. render
// : 페이지가 redering 됨
// 3. componentDidMount
// redering이 된 후에 componentDidMount 실행 => click 이벤트 등록 'sayHello'

// 4. [] 의사용
// dependency 에 아무것도 들어가있지 않음 => 페이지가 redering 될 때 한 번만 동작

// 결과 : 클릭 이벤트 지우고 - 렌더링 하고 - 클릭이벤트 등록하고 - 한번만 로딩되니까 중복으로 클릭이벤트 등록 될 일 없음

// reference는 component의 어떤 부분을 선택할 수 있는 방법이다.
// 모든 component는 reference prop을 가지고 있다.
// useRef()는 document. getElementById() 와 같은 기능을 한다.
// htmlTag에 ref={이름} 와 같이 사용한다.
// reference는 {current: HTMLHeadingElement} 의 형식으로 값을 반환한다.
// useEffect에서 return한 함수는 componentWillUnmount 때 호출된다.
// 참고로 useEffect에서 return한 함수를 cleanup function(클린업 함수)라고 부릅니다.
