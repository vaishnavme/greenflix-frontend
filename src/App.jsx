import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { useAuth, useData } from "./context";
import { Home, Playlist, PlaylistPage, VideoDetails, Login, Account, SignUp, NotFound } from "./pages"
import { Navbar, PrivateRoute } from "./components";
import './App.css';

function App() {
  const { isUserLogin } = useAuth();
  const { allVideos, dispatch } = useData();
  
  const getData = async () => {
    const response = await axios.get("https://api.npoint.io/23a22c6885c64df9945d");
    dispatch({type: "SET_DATA", payload: response.data.contents});
  }

  useEffect(() => {
    if(allVideos.length === 0) {
      getData();
    }
  },[])

  return (
    <div className="App">
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="playlist/:id" element={<PlaylistPage/>}/>
          <Route path="video/:id" element={<VideoDetails/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="*" element={<NotFound />} />
          <PrivateRoute 
            path="playlist" 
            element={<Playlist/>}
            login={isUserLogin}
          />
          <PrivateRoute
            path="account"
            login={isUserLogin}
            element={<Account />}
          />
        </Routes>
    </main>
    </div>
  );
}

export default App;
