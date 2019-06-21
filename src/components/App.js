import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import history from '../history';
import SessionList from './sessions/SessionList';
import SessionEdit from './sessions/SessionEdit';
import SessionDelete from './sessions/SessionDelete';
import SessionCreate from './sessions/SessionCreate';
import Profile from './profile/Profile';
import ResetSalary from './profile/ResetSalary';
import Header from './Header';
import Footer from './Footer';
import NotFound from './utils/NotFound';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header/>
                        <div className="flex-wrapper">
                            <Switch>
                                <Route path="/" exact component={SessionList}/>
                                <Route path="/sessions/new" exact component={SessionCreate}/>
                                <Route path="/sessions/edit/:id" exact component={SessionEdit}/>
                                <Route path="/sessions/delete/:id" exact component={SessionDelete}/>
                                <Route path="/profile" exact component={Profile}/>
                                <Route path="/resetSalary" exact component={ResetSalary}/>
                                <Route path="/error" exact component={NotFound}/>
                                <Route component={NotFound}/>  
                            </Switch>
                            <Footer/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;