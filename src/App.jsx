// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import TitleScene from './scenes/TitleScene';
import CorridorScene from './scenes/CorridorScene';
import ClearScene from './scenes/ClearScene';
import LeaderboardScene from './scenes/LeaderboardScene';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<TitleScene />} />
        <Route path="/game" element={<CorridorScene />} />
        <Route path="/clear" element={<ClearScene />} />
        <Route path="/leaderboard" element={<LeaderboardScene />} />
      </Routes>
    </div>
  );
};

export default App;
