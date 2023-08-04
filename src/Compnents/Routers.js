import React from "react";
import { Routes, Route } from "react-router-dom";
import AddFields from "./AddFields";
import FieldMapping from "./FieldMapping";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<AddFields />}></Route>
      <Route
        path="/fieldMapping"
        element={<FieldMapping />}
      ></Route>          
    </Routes>
    
  );
};
export default Routers;
