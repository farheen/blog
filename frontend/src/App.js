import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/blog">Blogs</Link> {/* Use absolute path */}
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/blog" component={BlogList} />
                    <Route path="/blog/:id" component={Blog} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

