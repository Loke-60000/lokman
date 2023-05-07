import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MainNavbar from './components/NavBar';
import Divergencemeter from './components/DivergenceMeter';
import Introduction from './pages/Introduction';
import ContactPage from './pages/Contact';
import Blog from './pages/blog';
import Login from './pages/Login';
import Createpost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import ModeratorPage from './pages/Moderator';
import EditPost from './pages/EditPost';
import Links from './pages/Links';
import Projects from './pages/Projects';
import './styles/scanlines.scss';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isScanlinesActive, setIsScanlinesActive] = useState(true);

  useEffect(() => {
    const scanlinesEnabled = localStorage.getItem('scanlinesEnabled');
    if (scanlinesEnabled === 'true') {
      setIsScanlinesActive(true);
    } else {
      setIsScanlinesActive(false);
    }
  }, []);

  const toggleScanlines = () => {
    setIsScanlinesActive(!isScanlinesActive);
    localStorage.setItem('scanlinesEnabled', !isScanlinesActive);
  };

  return (
    <div className="App">
      <div
        className={`scanlines ${isScanlinesActive ? '' : 'scanlines-inactive'}`}
      >
        <Router>
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td>
                    <MainNavbar />
                  </td>
                </tr>
                <tr>
                  <td className="main_content">
                    <Routes>
                      <Route path="/" element={<Introduction />} />
                      <Route path="/introduction" element={<Introduction />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/createpost" element={<Createpost />} />
                      <Route
                        path="/login"
                        element={<Login setIsAuth={setIsAuth} />}
                      />
                      <Route path="/post/:id" element={<PostPage />} />
                      <Route path="/edit/:postId" element={<EditPost />} />
                      <Route path="/moderator" element={<ModeratorPage />} />
                      <Route path="/links" element={<Links />} />
                      <Route path="/projects" element={<Projects />} />
                    </Routes>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Router>
        <div className="retro-mode-toggle">
          <button onClick={toggleScanlines}>Retro Mode</button>
        </div>
        <div className="copyrights">
          <p>2023 Lokman RAMDANI</p>
        </div>
        <div className="nixie_clock">
          <Divergencemeter />
        </div>
      </div>
    </div>
  );
}

export default App;
