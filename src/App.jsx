import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNavbar from './components/NavBar';
import Introduction from './pages/Introduction';

function App() {
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
                <td>
                  <Routes>
                    <Route path="/" element={<Introduction />} />
          
                  </Routes>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Router>
    </div>
  );
}

export default App;
