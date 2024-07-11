import { useEffect, useState } from "react";
import "./Recommended.css";
import moment from "moment";
import axios from "axios";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";
const Recommended = ({categoryId}) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const videolist = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
   const response=await axios.get(videolist)
  setData(response.data.items)
  };
  useEffect(() => {
    fetchData();
    console.log("length",data.length);
  }, [categoryId]);
  return (
    <div className="recommended">
     {data.map((item,index)=>{
      return(
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <div className="vid-info">
          <h4> {item.snippet.title}</h4>
          <p>{item.snippet.channelTitle}</p>
          <p>{value_converter(item.statistics.viewCount)}views &bull; {moment(item.snippet.publishedAt).from()}</p>{" "}
        </div>
      </Link>
      )
     })}
     
    </div>
  );
};

export default Recommended;
