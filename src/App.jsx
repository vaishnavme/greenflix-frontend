import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context";
import { Home, Playlist, PlaylistPage, VideoDetails, Login, Account, SignUp, NotFound } from "./pages"
import { Navbar, PrivateRoute } from "./components";
import './App.css';

function App() {
  const { isUserLogin } = useAuth();

  return (
    <div className="App">
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="playlist/:id" element={<PlaylistPage/>}/>
          <Route path="/:id" element={<VideoDetails/>}/>
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
