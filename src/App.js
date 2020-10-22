import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from '././containers/quiz/quiz'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import {connect} from 'react-redux'
import Logout from './components/LogOut/LogOut'
import {autoLogin} from './redux/Action/actionAuth'

class App extends Component {

  componentDidMount(){
    this.props.autoLogin()
  }

  render() {

//если не зареганы, не будет роута для создания тестов. а если зареганы пропадет роут про регистрацию, но появится роут про вылогинивание 
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
        <Redirect to = '/' />
      </Switch>
    )
    
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={QuizList} />
          <Redirect to = '/' />
        </Switch>
      )
    }

  return (
    <Layout> 
      {routes}
    </Layout> 
  )
}
}

function mapStateToProps(state){ //проверка на зарегестрированость 
  return{
    isAuthenticated: !!state.auth.token
  }
} 

function mapDispatchToProps(dispatch){
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
