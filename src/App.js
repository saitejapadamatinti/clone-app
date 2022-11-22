import {BrowserRouter, Redirect, Switch, Route} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import UserProfile from './components/userProfile'
import MyProfile from './components/myProfile'
import NoPost from './components/noPostes'
import SearchItems from './components/searchItems'
import NotFound from './components/notFound'

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/insta-share/users/:postUserId"
          component={UserProfile}
        />
        <Route exact path="/insta-share/my-profile" component={MyProfile} />
        <Route exact path="/no-post" component={NoPost} />
        {/* <Route exact path="/SearchItems" component={SearchItems} /> */}
        <Route component={NotFound} />
        <Redirect to="/not-fount" />
      </Switch>
    </BrowserRouter>
  </>
)

export default App
