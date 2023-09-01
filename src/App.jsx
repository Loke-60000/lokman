import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import MainNavbar from './components/NavBar';
import Divergencemeter from './components/DivergenceMeter';
import { LanguageProvider } from './components/LanguageToggle';
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
import PowerSwitch from './components/Switch';
import AmadeusLogin from './pages/Amadeus_login';
import Dashboard from './pages/Dashboard';
import Irasuto from './pages/Irasuto';
import errornotFoundimg from './assets/images/404sketch.png';

function NotFound() {
  return (
    <div className='errorNotFound'>
      <h1>404 - Not Found</h1>
      <img className='errorimg' src={errornotFoundimg} alt="" />
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>Certain pages are currently under construction. You can reach out to me for more information or simply await their completion.</p>
    </div>
  );
}

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
        <LanguageProvider>
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
                        <Route path="/amadeusHome" element={<AmadeusLogin />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/illustrations" element={<Irasuto />} />
                        {/* Add a catch-all route for 404 errors */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Router>
        </LanguageProvider>
        {/* <div className="retro-mode-toggle">
          <PowerSwitch
            isScanlinesActive={isScanlinesActive}
            toggleScanlines={toggleScanlines}
          />
        </div> */}
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
