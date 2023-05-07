import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MainNavbar from './components/NavBar';
import Divergencemeter from './components/DivergenceMeter';
import Introduction from './pages/Introduction';
import ContactPage from './pages/Contact';
import Blog from './pages/blog';
import Login from './pages/Login';
import Createpost from './pages/CreatePost';
import DebugNavbar from './components/DebugNav';
import PostPage from './pages/PostPage';
import ModeratorPage from './pages/Moderator';
import EditPost from './pages/EditPost';
import Links from './pages/Links';
import Projects from './pages/Projects';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="App">
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
                <td className='main_content'>
                  <Routes>
                    <Route path="/" element={<Introduction />} />
                    <Route path="/lokman/introduction" element={<Introduction />} />
                    <Route path="/lokman/contact" element={<ContactPage />} />
                    <Route path="/lokman/blog" element={<Blog />} />
                    <Route path="/lokman/createpost" element={<Createpost />} />
                    <Route path="/lokman/login" element={<Login setIsAuth={setIsAuth} />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="/edit/:postId" element={<EditPost />} />
                    <Route path="/lokman/moderator" element={<ModeratorPage />} />
                    <Route path="/lokman/links" element={<Links />} />
                    <Route path="/lokman/projects" element={<Projects />} />
                  </Routes>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Router>
      <div className="copyrights">
        <p>2023 Lokman RAMDANI</p>
      </div>
      <div>
      </div>
      <div className="nixie_clock">
        <Divergencemeter />
      </div>
    </div>
  );
}

export default App;
