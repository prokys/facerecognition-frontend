import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg'
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


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
const returnClarifaiRequestOptions = (imageUrl) =>{
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '62ed9203560d4d62ae37a1f93f9937b8';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = '6zsnxmq8z8rc';       
  const APP_ID = 'my-first-application-hst4bl';
  // Change these to whatever model and image URL you want to use 
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});
const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};

return requestOptions;
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
      }
    }
  }

  loadUser = (data => {
    this.setState({
      user:
      {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  })

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row*height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(this.state.input))
        .then(response => response.json())
        .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
  }
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
      this.setState({route: route});
  }

  render(){
    const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
        <ParticlesBg type='custom' config={config} bg={true}/>
        <Navigation isSignedIn= {isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home' 
        ? 
        <div>
        <Logo />
        <Rank/>
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box = {box} imageUrl={imageUrl}/>
        </div>
        : (
          route === 'signin'
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          ) 
        }
    </div>
  );
}
}

export default App;
//https://upload.wikimedia.org/wikipedia/commons/f/fb/Tom_Hanks_2016.jpg