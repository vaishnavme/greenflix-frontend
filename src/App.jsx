import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context";
import { Home, Playlists ,VideoDetails, Login, Account, SignUp, NotFound } from "./pages"
import { Navbar, PrivateRoute } from "./components";
import { ToastContainer, Slide } from "react-toastify";

function App() {
  const { user } = useAuth();

  return (
    <div>
      <Navbar/>
        <div className="main">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/:id" element={<VideoDetails/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="*" element={<NotFound />} />
              <PrivateRoute path="/playlist" login={user} element={<Playlists />}/>
              <PrivateRoute path="account" login={user} element={<Account />}/>
            </Routes>
        </div>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            transition={Slide}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
        />
    </div>
  );
}

export default App;
