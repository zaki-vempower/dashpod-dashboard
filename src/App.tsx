import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { useAuth } from './hooks/useAuth';
import CreateProfile from './pages/Authentication/CreateProfile';
const Calendar = lazy(() => import('./pages/Calendar'));
const Chart = lazy(() => import('./pages/Chart'));
const FormElements = lazy(() => import('./pages/Form/FormElements'));
const FormLayout = lazy(() => import('./pages/Form/FormLayout'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Tables = lazy(() => import('./pages/Tables'));
const Alerts = lazy(() => import('./pages/UiElements/Alerts'));
const Buttons = lazy(() => import('./pages/UiElements/Buttons'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
Amplify.configure(awsconfig);
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn,SetLoggedIn] = useState<boolean>(false)
  const { isUserLoggedIn } = useAuth() as { isUserLoggedIn: () => Promise<boolean>}
  useEffect(() => {
    checkAuth()
  }, []);

  const checkAuth = async () => {
    const isLogged = await isUserLoggedIn()
    SetLoggedIn(!isLogged)
    setLoading(false)
  }

  if(loading) {
    return <Loader />
  }

  if(isLoggedIn) {
    return (
      <Routes>
      <Route path="*" element={<SignIn />} />
      {/*
// @ts-ignore*/}
      <Route path="/auth/signup" exact element={<SignUp />} />
      <Route path='/auth/create-profile' element={<CreateProfile />} />
    </Routes>
    )
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} /> */}
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          <Route
            path="/calendar"
            element={
              <Suspense fallback={<Loader />}>
                <Calendar />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <Suspense fallback={<Loader />}>
                <FormElements />
              </Suspense>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <Suspense fallback={<Loader />}>
                <FormLayout />
              </Suspense>
            }
          />
          <Route
            path="/tables"
            element={
              <Suspense fallback={<Loader />}>
                <Tables />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="/chart"
            element={
              <Suspense fallback={<Loader />}>
                <Chart />
              </Suspense>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <Suspense fallback={<Loader />}>
                <Alerts />
              </Suspense>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <Suspense fallback={<Loader />}>
                <Buttons />
              </Suspense>
            }
          />
        <Route path='/create-profile' element={<CreateProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
