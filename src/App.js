import React from "react";
import './App.css';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import Donation from "./Components/Donation/Donation";

function App() {

  return (
    <div className="app">
      <Main />
      <Donation />
      <Footer />
    </div>
  );
}

export default App;
