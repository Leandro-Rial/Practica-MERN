import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import PostsList from './components/PostsList';
import CreatePost from './components/CreatePost';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <Navbar />

      <div className="p-4">
        <Route exact path="/" component={PostsList} />
        <Route path="/edit/:id" component={CreatePost} />
        <Route path="/create" component={CreatePost} />
      </div>
    </Router>
  );
}

export default App;
