import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
// import "./list.scss";
import "../../styles/list.css"

export default function List({listitem}) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{listitem.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow list-left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="list-container" ref={listRef}>
          {
            listitem.content.map((movie,i)=>{
             return <ListItem movieid={movie} index={i} />
            })
          }
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow list-right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
