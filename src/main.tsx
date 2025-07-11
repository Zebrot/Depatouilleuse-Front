import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import Blog from './pages/Blog'
import Tips from './pages/Tips'
import Single from './pages/Single'
import Header from './components/Header'
import Modify_Blog from './pages/Modify_Blog'
import Test from './pages/Test'
import './style/css/global.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <main className = "main-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/single" element={<Single/>} />
          <Route path="/map" element={<Map/>} />
          <Route path="/edit" element={<Modify_Blog/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/tips" element={<Tips/>} />
          <Route path="/test" element={<Test/>} />
        </Routes>
      </main>
    </Router>
  </StrictMode>
)
