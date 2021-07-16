import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context";
import { Home, Likedvideos, Watchlater ,VideoDetails, Login, Account, SignUp, NotFound } from "./pages"
import { Navbar, PrivateRoute } from "./components";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/:id" element={<VideoDetails/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="*" element={<NotFound />} />
          <PrivateRoute path="/liked" login={user} element={<Likedvideos />}/>
          <PrivateRoute path="/watch" login={user} element={<Watchlater />}/>
          <PrivateRoute
            path="account"
            login={user}
            element={<Account />}
          />
        </Routes>
    </main>
    </div>
  );
}

export default App;
