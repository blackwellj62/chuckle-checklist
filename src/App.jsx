import { useEffect, useState } from "react";
import { postNewJoke } from "./services/jokeService.jsx";
import { getAllJokes } from "./services/jokeService.jsx";
import stevePic from "./assets/steve.png"
import "./App.css";

export const App = () => {
  const [userInput, setUserInput] = useState('')
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState('')
  const [toldJokes, setToldJokes] = useState([])
   
useEffect(()=>{
    getAllJokes().then((jokesArray)=>{
      setAllJokes(jokesArray)
      console.log("jokes set!")
    })
}, [])

// useEffect(()=>{
//   if (untoldJokes === false){
//     const untold = allJokes.filter(joke => joke.told === false)
//     setUntoldJokes(untold)
//   }
// }, [untoldJokes, allJokes])

  const handleJokeChange = (event) => {
      setUserInput(event.target.value)
  }
const handleSubmit = async () => {
  await postNewJoke(userInput)
  return setUserInput('')
}

  return (
    <div className="app-container">
      <div className="app-heading">
      <div className="app-heading-circle">
   <img className="app-logo" src={stevePic} alt="Good job Steve" />
 </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
        <h2 className="h2"> Add Joke </h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          value={userInput}
          placeholder="New One Liner"
          onChange={handleJokeChange}
        />
        <button className="joke-input-submit" onClick={handleSubmit}>Add</button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2 className="h2">Untold</h2>
          {/* <ul>
            <li joke-list-item>{untoldJokes}</li>
          </ul> */}
          </div>
        <div className="joke-list-container">
          <h2 className="h2">Told</h2>
          </div>

      </div>
        
      
    </div>
  );
};
