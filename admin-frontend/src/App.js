import React,{useEffect} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import PrivateRoute from './components/HOC/privateRoute'
import { isUserLoggedIn } from './actions';
import {useDispatch , useSelector} from 'react-redux';
import Products from './containers/products';
import Orders from './containers/orders';
import Category from './containers/category';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
 
  useEffect(() => {
    if(!auth.authenticate)
    {
        dispatch(isUserLoggedIn())
    }
}, []);

  return (
    <div className="App">
        <Switch>
       
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/orders" component={Orders} />
          <PrivateRoute path="/category" component={Category} /> 
          <Route path="/signup" component={Signup}></Route>
          <Route path="/signin" component={Signin}></Route>
        </Switch>
    </div>
  );
}

export default App;
