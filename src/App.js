
import './App.css';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "./firebase/Firebase.init";
import { useState } from 'react';

  const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

    const handleGoogleSingIn = ()=>{
      signInWithPopup (auth,googleProvider)
      .then(result =>{
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error =>{
        console.error('error:',error);
      })
    }
      const handleSignOut = () => {
        signOut(auth)
          .then(() => {
            setUser({});
          })
          .catch(() => {
            setUser({})
          })
        }
        const handleGithubSingIn = ()=>{
          signInWithPopup(auth,githubProvider)
          .then(result=>{
            const user =result.user;
            setUser(user);
            console.log(user);
          })
          .catch(error =>{
            console.error('error:',error);
          })

        }
    

  return (
    <div className="App">
   {
     user.uid ?
     <button onClick={handleSignOut}>Sign Out</button>
     :
    <>
       <button onClick={handleGoogleSingIn}>Google sing in</button>
       <button onClick={handleGithubSingIn}>Github Sing in</button>
    </>
    
   }
    {user.uid && <div>
    <h3>User name: {user.displayName}</h3>
    <p>Email address: {user.email}</p>
        <img src={user.photoURL} alt="" />
        </div>}
    </div>
  );
}

export default App;
