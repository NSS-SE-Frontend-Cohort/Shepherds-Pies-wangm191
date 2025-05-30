import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register"
import { Authorized } from "./views/Authorized";
import { ApplicaionViews } from "./views/ApplicationViews";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element= {<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="*" 
        element={ 
          <Authorized>
            <ApplicaionViews /> 
          </Authorized>
        }
      />
    </Routes>
  )
}

export default App;
