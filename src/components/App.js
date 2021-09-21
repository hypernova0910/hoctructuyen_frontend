import React, { Suspense, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import FormSignIn from './FormSignIn';
import CourseDetail from './CourseDetail';
import NotFound404 from './NotFound404';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
    render() {
        return(
            <div className="app">
                <Router>
                    <Switch>
                        <Route path='/sign-in' component={FormSignIn}></Route>
                        <Route path='/'>
                            <Header/>
                            <div className="container" id="main">
                                <ErrorBoundary>
                                    <Switch>
                                        <Route path='/course/:id'>
                                            <CourseDetail/>
                                        </Route>
                                        <Route exact path='/'>
                                            <Home />
                                        </Route>
                                        <Route path="*" component={NotFound404} />
                                    </Switch>
                                </ErrorBoundary>
                            </div>
                            <Footer/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;