import './App.css';
import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'

const config = {
  num: [4, 7],
  rps: 0.1,
  radius: [5, 40],
  life: [1.5, 3],
  v: [2, 3],
  tha: [-50, 50],
  alpha: [0.6, 0],
  scale: [.1, 0.9],
  position: "all",
  color: ["random", "#ff0000"],
  cross: "dead",
  random: 10
}


function App() {
  return (
    <div className="App">
        <ParticlesBg type='custom' config={config} bg={true}/>
        <Navigation/>
        <Logo />
        <Rank/>
        <ImageLinkForm />
      {/*    <Facerecognition /> */}
    </div>
  );
}

export default App;
