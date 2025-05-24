import "./App.css";
import { ApplicaionViews } from "./views/ApplicationViews";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="*" element={ <ApplicaionViews />} />
    </Routes>
  )
}

export default App;
