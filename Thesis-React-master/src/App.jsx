import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import SelectExercise from './pages/SelectExercise'
import Exercise from './pages/Exercise'
import Result from './pages/Result'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select_exercise" element={<SelectExercise />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>


    </>
  )
}

export default App
