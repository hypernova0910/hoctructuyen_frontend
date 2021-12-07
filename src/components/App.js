import React, { useContext } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import LoginContainer from './LoginContainer';
import Background from './Background';
import CourseDetail from './CourseDetail';
import NotFound404 from './NotFound404';
import SubmitExercise from './SubmitExercise';
import MarkExercise from './MarkExercise'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StoreContext } from "../utils/store";
import useAuth from '../hooks/useAuth';
import ReactLoading from 'react-loading';
import ProcessForm from './ProcessForm';

function App(){
    const { loadingContext } = useContext(StoreContext);
    const [loading, setLoading] = loadingContext
    const {user} = useAuth()
    if(!user){
        return(
            <Background img="Picture1.jpg">
                <ReactLoading type='spin' color='#aaa' className={'center-screen top-component ' + (loading ? '' : 'hidden')} />
                <LoginContainer/>
            </Background>
        )
    }
    else{
        return(
            <div className="app">
                <ReactLoading type='spin' color='#aaa' className={'center-screen top-component ' + (loading ? '' : 'hidden') }/>
                <Router>
                    <Header/>
                    <div className="container" id="main">
                        <ErrorBoundary>
                            <Switch>
                                <Route path='/course/:id' component={CourseDetail}/>
                                    {/* <Switch>
                                        <Route path='/' component={CourseDetail}/>
                                    </Switch> */}
                                <Route path='/nop-bai/:qtid' component={SubmitExercise}/>
                                <Route path='/cham-bai/:qtid' component={MarkExercise}/>
                                <Route exact path='/'>
                                    <Home />
                                </Route>
                                <Route path="*" component={NotFound404} />
                            </Switch>
                        </ErrorBoundary>
                    </div>
                    <Footer/>
                </Router>
            </div>
        )
    }
}

export default App;