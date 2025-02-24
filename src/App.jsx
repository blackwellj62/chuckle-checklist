import { useEffect, useState } from "react";
import { deleteJoke, editJoke, postNewJoke } from "./services/jokeService.jsx";
import { getAllJokes } from "./services/jokeService.jsx";
import stevePic from "./assets/steve.png";
import "./App.css";

export const App = () => {
  const [userInput, setUserInput] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
      console.log("jokes set!");
    });
  }, []);

  useEffect(() => {
    const untold = allJokes.filter((joke) => joke.told === false);
    setUntoldJokes(untold);

    const told = allJokes.filter((joke) => joke.told === true);
    setToldJokes(told);
  }, [allJokes]);

  const handleJokeChange = (event) => {
    setUserInput(event.target.value);
  };
  const handleSubmit = async () => {
    await postNewJoke(userInput);
    setUserInput("");
    reFetch()
  };

  const reFetch = () => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
    })
  }
  
const handleEditJoke = async (joke) => {
  let changedJoke = {
    text: joke.text,
    told: !joke.told
  }
   
   await editJoke(changedJoke, joke.id)
    reFetch()

}

const handleDeletedJoke = async (joke) => {
  let deletedJoke = {
    text: joke.text,
    told: joke.told
  }
  await deleteJoke(deletedJoke, joke.id)
  reFetch()
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
        <button className="joke-input-submit" onClick={handleSubmit}>
          Add
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2 className="h2">Untold 
            <span className="untold-count">{untoldJokes.length}</span>
          </h2>
          <ul>
            {untoldJokes.map((joke) => (
              <li key={joke.id} className="joke-list-item">
                {joke.text}
              <button onClick={()=>{handleEditJoke(joke)}}>✔️</button>
              <button onClick={()=>{handleDeletedJoke(joke)}}>🗑️</button>
              </li>
              
            ))}
          </ul>
        </div>
        <div className="joke-list-container">
          <h2 className="h2">Told
            <span className="told-count">{toldJokes.length}</span>
          </h2>
          <ul>
            {toldJokes.map((joke) => (
              <li key={joke.id} className="joke-list-item">
                {joke.text}
                <button onClick={()=>{handleEditJoke(joke)}}>✖️</button>
                <button onClick={()=>{handleDeletedJoke(joke)}}>🗑️</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
