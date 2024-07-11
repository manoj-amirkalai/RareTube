import "./Feed.css";
import { value_converter } from "../../data";
import { Link } from "react-router-dom";
import { API_KEY } from "../../data";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
const Feed = ({ category }) => {
  console.log(category);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const videolist = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
   const response=await axios.get(videolist)
  setData(response.data.items)
  };
  useEffect(() => {
    fetchData();
    console.log("length",data.length);
  }, [category]);
  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} key={index} className="card">
            {" "}
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>
              {item.snippet.title}
            </h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{value_converter(item.statistics.viewCount)}views &bull; {moment(item.snippet.publishedAt).from()}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
