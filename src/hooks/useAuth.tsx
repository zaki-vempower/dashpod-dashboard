import { Auth } from "aws-amplify";

// contexts/auth.js

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import GetProfile from "../graphqlQueries/GetProfile";
import { API, graphqlOperation } from "aws-amplify";
import { useAtom } from "jotai";
import { userData } from "../store/dashboardAtom";

interface Props {
  children?: React.ReactNode;
  // any props that come into the component
}

interface AuthData {
  token: string;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useAtom(userData);
  const navigate = useNavigate();

  useEffect(() => {
    // getCurrentSession();
  }, []);
  async function signOut() {
    try {
      await Auth.signOut();
      navigate("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  //@ts-ignore
  async function signIn({ username, password }) {
    try {
      const user = await Auth.signIn(username, password);
      if (user?.attributes?.email_verified) {
        console.log('isUserLoggedIn',user);
        
        setUser(user.attributes);
        // navigate("/");
        window.location.replace('/')
      }
    } catch (e) {
      var newError = new Error("User is not confirmed.");
      if (e.message === newError.message) {
        navigate("/confirm-user");
      }
    }
  }

  async function resendConfirmationCode({ username }: {
    username: string
  }) {
    try {
      await Auth.resendSignUp(username);
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  async function isUserLoggedIn() {
    console.log('hey');
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      console.log('authenticatedUser',authenticatedUser)
      setUser(authenticatedUser?.attributes);
      if (authenticatedUser !== undefined) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  async function confirmSignUp({ username, code }) {
    try {
      const confirmOtp = await Auth.confirmSignUp(username, code);
      if (confirmOtp && confirmOtp === "SUCCESS") {
        setUser({
          ...(user || {}),
          email_verified: true,
        });
        navigate("/completeProfile");
      }
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  //@ts-ignore
  async function signUp({ username, password, email, phone_number }) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          phone_number, // optional - E.164 number convention
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
        //@ts-ignore
      if (user && user?.username) {
          //@ts-ignore
        setUser({ ...user, username: user.username });
        setTimeout(() => {
          navigate("/auth/create-profile");
        },2000)
      }
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        signIn,
        signUp,
        signOut,
        confirmSignUp,
        setUser,
        isUserLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
