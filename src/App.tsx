

import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useUserThreads from "./hooks/useUserThreads";
import useOrCreateUser from "./hooks/useOrCreateUser";

function App() {
  const [authUser, loading] = useAuthState(auth);
  console.log("Loading, Auth", loading, authUser);

  // If we don't have the user in our db, we create it
  const { user } = useOrCreateUser();
  console.log("DB User: ", user);

  // Test the useUserThreads hook
  const threads = useUserThreads();
  console.log("Threads: ", threads);

  return (
    <div className="App">
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <>
          <ChatBox />
        </>
      )}
    </div>
  );
}

export default App;