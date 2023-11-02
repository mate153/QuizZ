import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Login from './components/Login';
import Main from './components/Main';
import Game from './components/Game';
import Info from './components/Info';
import Credit from './components/Credit';
import Quit from './components/Quit';
import ErrorPage from './components/ErrorPage';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import PleaseLogin from './components/PleaseLogin';

function App() {
  const [user, setUser] = useState("")
  return ( 
    <Routes>
      <Route path='/' element={<Main user={user} />}>
        <Route path='/login' element={user !== "" ? <Navigate to={'/'}/> : <Login setUser={setUser} />} />
        <Route path='/credit' element={<Credit />} />
        <Route path='/info' element={<Info />} />
        <Route path='/profile' element={user === "" ? <Navigate to={'/'}/> : <Profile />} />
        <Route path='/game' element={user === "" ? <PleaseLogin /> : <Game user={user}/>} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/quit' element={<Quit />} />
      </Route>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  );
}

export default App;
