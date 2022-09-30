// import "./listItem.scss";
import "../../styles/listItem.css"
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

export default function ListItem({movieid, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie,setMovie] = useState({})
  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
 
    useEffect(()=>{
      const getMovie = async()=>{
        const res = await fetch('/movie/'+movieid);
        const data = await res.json();
        console.log(data)
        if(data.success){
          setMovie(data.movie)
        }
      }
      getMovie();
    },[movieid])

  return (
    <Link to={'/watch'} state={movie}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.img}
        alt=""
      />
      {isHovered && (
        <>
          <video src={trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>1 hour 14 mins</span>
              <span className="limit">+16</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.title}</div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
}
