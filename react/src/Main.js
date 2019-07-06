import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Products from './Products'
import Contact from './Contact'
import About from './About'
import Art from './Art1'
import User1 from './User1'
import Dashboard from './Dashboard'
import Login from './Login'
import SignUp from './signup'
import AddProduct from './addProduct'
import UpdateProduct from './updateProduct'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/login' component={Login} />
      <Route path='/products' component={Products}/>
      <Route path='/contact' component={Contact}/>
      <Route path='/product/:art' component={Art}/>
      <Route path='/about' component={About}/>
      <Route path='/user1' component={User1}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/signup' component={SignUp} />
      <Route path='/addproduct' component={AddProduct} />
      <Route path='/updateproduct/:uuid' component={UpdateProduct} />
    </Switch>
    
  </main>
)

export default Main
