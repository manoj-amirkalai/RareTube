import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import rare from "../../assets/A.Manoj.jpg";
import { API_KEY, value_converter } from "../../data";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
const PlayVideo = () => {
  const {videoId}=useParams()
  const [apidata, setApiData] = useState(null);
  const [channeldata, setChanneldata] = useState(null);
  const [commentdata, setCommentdata] = useState(null);
  const fetchvideodata = async () => {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    );
    setApiData(response.data.items[0]);
  };
  const fetchchanneldata = async () => {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`
    );
    const responses = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
    );
    setCommentdata(responses.data.items);
    setChanneldata(response.data.items[0]);
  };
  useEffect(() => {
    fetchvideodata();
  }, [videoId]);
  useEffect(() => {
    fetchchanneldata();
  }, [apidata]);
  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apidata ? apidata.snippet.title : "Title here"}</h3>

      <div className="play-video-info">
        <p>
          {apidata ? value_converter(apidata.statistics.viewCount) : "16k"}{" "}
          views &bull;
          {apidata
            ? moment(apidata.snippet.publishedAt).fromNow()
            : "today"}{" "}
        </p>

        <div>
          <span>
            <img src={like} alt="" />
            {apidata ? value_converter(apidata.statistics.likeCount) : "16k"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
          </span>
          <span>
            <img src={save} alt="" />
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={
            channeldata ? channeldata.snippet.thumbnails.default.url : { rare }
          }
          alt=""
        />
        <div>
          <p>{apidata ? apidata.snippet.channelTitle : "Channel Title"}</p>
          <span>
            {channeldata
              ? value_converter(channeldata.statistics.subscriberCount)
              : "250k"}
            subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apidata
            ? apidata.snippet.description.slice(0, 250) + "..."
            : "Description here"}
        </p>
        <hr />
        <h4>
          {apidata ? value_converter(apidata.statistics.commentCount) : "120"}{" "}
          comments
        </h4>
        {commentdata &&
          commentdata.map((item, index) => {
            return (
              <div key={index} className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                  <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
                  </h3>
                  <p>
                  {item.snippet.topLevelComment.snippet.textDisplay}
                  </p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>
                    {value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlayVideo;
