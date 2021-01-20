import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HomePage } from "./pages/home";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContext } from "./contexts/authContext";
import { PartPage } from './pages/parts';
import { PrivateRoute } from './components/protectedRoute';
import { LoadContext } from './contexts/loadContext';
import { SendResetEmail } from './pages/sendResetEmail';
import { ResetPassword } from './pages/resetPassword';
import { Part, PartContext } from './contexts/partContext';
import { Layout } from 'antd';
import styles from "./styles/index.module.css";
import 'antd/dist/antd.css';
import './styles/global.css';
import { Header } from "./components/header";

const App = (props: any) => {

  let [loggedIn, setLoggedIn] = useState(false);
  let [token, setToken] = useState('');
  let [loading, setLoading] = useState(false);
  let [parts, setParts] = useState<Part[]>([]);
  let [page, setPage] = useState(1);
  let [numPages, setNumPages] = useState(1);
  let [filterName, setFilterName] = useState('');

  return (
    <LoadContext.Provider value={{ loading, setLoading }}>
      <AuthContext.Provider value={{ loggedIn, setLoggedIn, token, setToken }}>
        <PartContext.Provider value={{ parts, setParts, page, setPage, numPages, setNumPages, filterName, setFilterName }}>
          <Layout className={styles.Layout}>
            <Header/>
            <Layout.Content className={styles.Content}>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/send-reset-email' component={SendResetEmail} />
              <Route exact path='/change-password' component={ResetPassword} />
              <PrivateRoute exact path='/parts' component={PartPage} />
              </Layout.Content>
            <Layout.Footer className={styles.Footer}>Please contact jordepstein@gmail.com with any issues. Thanks!</Layout.Footer>
          </Layout>
        </PartContext.Provider>
      </AuthContext.Provider>
    </LoadContext.Provider>
  )
}

ReactDOM.render(
  <BrowserRouter basename="/partalerts">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
