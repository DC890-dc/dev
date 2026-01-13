import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import Betting from "./Components/Betting"
import Leaderboard from "./Components/Leaderboard"
import About from "./Components/About_Us"
import Contact from "./Components/Contact_Us"

function App() {
  return (
    <Router>
      <>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">Snowboarding Betting</Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/betting">Betting</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              <section className="home-hero">
                <div className="home-content">
                  <h1>SNOWBOARD BETTING</h1>
                  <p>
                    Predict outcomes. Place smart bets.
                    Build your balance on the mountain.
                  </p>

                  <Link to="/betting" className="btn btn-primary btn-lg mt-4">
                    Start Betting
                  </Link>
                </div>
              </section>
            }
          />

          <Route path="/betting" element={<Betting />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
 {/* Footer */}
        <footer className="site-footer">
          <div className="container text-center">
            <p>
              © {new Date().getFullYear()} Snowboarding Betting.  
              All rights reserved.
            </p>
            <p className="footer-disclaimer">
              This site is for educational and demonstration purposes only.
              No real money gambling.
            </p>
          </div>
        </footer>
      </>
    </Router>
  )
}

export default App