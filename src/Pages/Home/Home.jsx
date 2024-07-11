
import { useState } from 'react'
import Feed from '../../Components/Feed/Feed'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Home.css'
const Home = ({sidebar}) => {
  const [category,setCategory]=useState(0)
  return (
    <>
      <Sidebar sidebar={sidebar} setCategory={setCategory} category={category}/>
      <div className={`container ${sidebar?"":"large-container"}`}>
        <Feed category={category}/>
      </div>
    </>
  )
}

export default Home
