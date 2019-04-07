//container/app/index.js
//1. Navigation Header
//2. Containing component need to be rendered

import React from 'react';
import {Route, Link} from 'react-router-dom';
import Home from '../home';
import About from '../about';



//need to include home and about components
const App = () => (
    <div>
        <header>
            <Link to='/'>Home</Link>
            <Link to='/about-us'>About</Link>
        </header>
        <main>
            <Route exact path="/" component={Home} />
            <Route exact path = '/about-us' component={About} />
        </main>
    </div>   
)

export default App;