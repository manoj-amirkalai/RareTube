
import { useParams } from 'react-router-dom'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommended from '../../Components/Recommended/Recommended'
import './Video.css'
const Video = () => {
  const {videoId,categoryId}=useParams()
  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId} categoryId={categoryId} />
      <Recommended   categoryId={categoryId}/>
    </div>
  )
}

export default Video
