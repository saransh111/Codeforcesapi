import "./App.css";
import ProblemSolver from "./MyRoutes/ProblemSolver";
import Home from "./MyRoutes/Home";
import Login from "./MyRoutes/Login";
import FriendSubmission from "./MyRoutes/FriendSubmisson";
import Contest from "./MyRoutes/Contest";
import ContestNo from "./MyRoutes/ContestNo";
import Problems from "./MyRoutes/Problems";
import {RecoilRoot,atom,selector, useRecoilState, useRecoilValue} from 'recoil';

import { Routes,Route,BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/friendSubmission" element={<FriendSubmission/>} />
            <Route path="/contest" element={<Contest />} />
            <Route path="/contest/:contestNo" element={<ContestNo />} />
            <Route path="/Problems" element={<Problems />} />
            <Route path="/solve_problem" element={<ProblemSolver />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App;
