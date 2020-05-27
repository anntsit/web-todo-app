import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './todoList';
import { LoginBlock } from './authPage';
import {Switch, Route, Link} from 'react-router-dom';
import { feathersApp } from './feathers';


async function tryGetAccessToken() {
  const token = await feathersApp.authentication.getAccessToken();
  console.log('Current token: ', token);

  return await feathersApp.authentication.getFromLocation(window.location).then(
        (token: string) => {
            console.info("Got auth token:", token);
            if (token !== null) {
              feathersApp.authentication.setAccessToken(token);
              console.info("Set auth token:", token);
              return Promise.resolve(true);
            }
            return Promise.resolve(false);
        },
    ).catch((e: any) => Promise.resolve(false));
}


function App() {
  const [user, setUser] = useState<any>(null);
  //
  // useEffect(() => {
  //   async function auth() {
  //     await tryGetAccessToken();
  //
  //     const userData = await feathersApp.authenticate();
  //
  //     if (userData.user) {
  //       console.info('UserData', userData);
  //       setUser(userData.user);
  //     } else {
  //       setUser(null);
  //     }
  //   }
  //
  //   auth();
  // });

  return (
    <div className="main-container">
      <header className="header">
          <div className={"logo"}>
              MyToDo™
          </div>
          <div>
              <Link to={'/login'} className={'link'}>Login</Link>
              <Link to={'/todo'} className={'link'}>ToDo</Link>
          </div>
      </header>
      <div className="content">
          <Switch>
              <Route path='/login' component={LoginBlock} />
              <Route path='/todo' component={TodoList} />
          </Switch>
      </div>
    </div>
  );
}

export default App;
