import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Navigation from './components/Navigation/Navigation';

function App() {

  return (
    <>    
    <Toaster position="top-right" reverseOrder={false} />
    <Navigation />
    </>
  )
}

export default App;
