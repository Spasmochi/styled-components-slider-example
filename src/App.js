import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import styled from "styled-components";

/**
 * Styles
 */
const OuterDiv = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  border-radius: 8px;
  & > div {
    position: unset;
    min-width: 100%;
  }
`;

const InnerDiv = styled(OuterDiv)`
  position: unset;
  background-color: red;
  overflow-x: hidden;
  display: flex;
`;

const Button = styled.button.attrs((props) => ({
  size: props.size || "40px"
}))`
  background-color: blue;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  outline: none;
  border: none;
  position: absolute;
  top: 50%;
  border-radius: 8px;
  left: ${(props) => (props.side === "left" ? "0" : "auto")};
  right: ${(props) => (props.side === "right" ? "0" : "auto")};
  transform: ${(props) =>
    props.side === "left" ? "translate(-50%, -50%)" : "translate(50%, -50%)"};
  &:hover {
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

/**
 * Data
 */
const details = ["one", "two", "three", "oiii", "yayayaya"];

/**
 * App Component
 */
export function App() {
  const Card = ({ text }) => <div>{text}</div>;
  const SlideButton = ({ side }) => (
    <Button side={side} onClick={() => click({ side })}>
      {side}
    </Button>
  );

  const containerRef = useRef();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log(index);
    let scrollDistance = containerRef.current.scrollWidth / details.length;

    containerRef.current.scroll({
      top: 0,
      left: scrollDistance * index,
      behavior: "smooth"
    });
  });

  return (
    <div style={{ padding: 200 }}>
      <OuterDiv>
        <SlideButton side="left" />
        <InnerDiv ref={containerRef}>
          {details.map((data, i) => (
            <Card text={data} key={i} />
          ))}
        </InnerDiv>
        <SlideButton side="right" />
      </OuterDiv>
    </div>
  );

  function click(ref) {
    ref.side === "left" ? setTheIndex(0) : setTheIndex(1);
  }

  function setTheIndex(dir) {
    if (dir) {
      console.log("right");
      if (index === details.length - 1) {
        setIndex(0);
      } else {
        setIndex((prev) => prev + 1);
      }
    } else {
      console.log("left");
      if (index === 0) {
        setIndex(details.length - 1);
      } else {
        setIndex((prev) => prev - 1);
      }
    }
  }
}
