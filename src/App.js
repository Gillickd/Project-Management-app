import { BrowserRouter, Route, Switch, Redirect} from  'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//styles

import './App.css'

//pages and components
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Create from './pages/create/Create'
import Project from './pages/project/Project'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'

function App() {

  //authIsReady comes from useAuthContext
  //If user connects then items below will render

  const { user, authIsReady} = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
      <BrowserRouter>
      {/**Only show the side bar is user authenicated*/}
      {user && <Sidebar />}
      <div className="container">
        <Navbar />
          <Switch>
          <Route exact path="/">
            {/*If  user account not authenticated, redirect to login  */}
            {!user && <Redirect to="/login" />}
            {/*If  authenicated  redirect to Dasboard  */}
            {user && <Dashboard />}
          </Route>
          <Route  path="/create">
          {!user && <Redirect to="/login" />}
           {user && <Create />}
          </Route>
          <Route  path="/projects/:id">
            {!user && <Redirect to="/login" />}
            {user &&<Project />}
          </Route>
          <Route  path="/login">
            {user && <Redirect to="/" />}
            {!user && <Login />}
          </Route>
          <Route  path="/signup">
          {user && <Redirect to="/" />}
            {!user &&<Signup />}
          </Route>

        </Switch>

      </div>
      {user && <OnlineUsers/>}

      
      </BrowserRouter>
      )}

    </div>
  );
}

export default App
