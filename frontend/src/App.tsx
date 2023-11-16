import react from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CreatePlant from "./pages/CreatePlant";

const App = () => {
  return (
    <Routes>
      <Route path = "/" element = {<Homepage/>}/>
      <Route path = "/plants/create" element = {<CreatePlant/>}/>
      <Route path = ""/>
      <Route path = ""/>
      <Route path = ""/>
    </Routes>
  )
}

export default App
