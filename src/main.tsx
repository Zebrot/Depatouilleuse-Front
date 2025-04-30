import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import Blog from './pages/Blog'
import Tips from './pages/Tips'
import Header from './components/Header'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <main className = "main-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/map" element={<Map/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/tips" element={<Tips/>} />

        </Routes>
      </main>
    </Router>
  </StrictMode>
)
