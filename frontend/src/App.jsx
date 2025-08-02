import React, { useState } from 'react';
import UserDetail from "./UserDetail";
import UserDisplay from './UserDisplay';

function App() {
  const [islogedin, setIslogedin] = useState(false);
  const [userprofile, setUserprofile] = useState(null);

  if (islogedin && userprofile) {
    return <UserDisplay profile={userprofile} />;
  }

  return <UserDetail setIslogedin={setIslogedin} setUserprofile={setUserprofile} />;
}


export default App;
