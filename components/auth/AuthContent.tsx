import { useState } from "react";
import { Alert, StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// import FlatButton from "../ui/FlatButton";
import LoginForm from "./LoginForm";
import { colors } from "../../constants/Colors";
import SignupForm from "./SignupForm";
import { createUser, login } from "../../util/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { setUser, setUserName } from "../../context/slices/userSlice";
import { fetchUser, fetchUserByEmail } from "../../services/users";

interface Content {
  isLogin: boolean;
  //onAuthenticate: any;
}

type Credentials = {
  email: string;
  password: string;
  confirmEmail: string;
  confirmPassword: string;
};

function AuthContent({ isLogin }: Content) {
  const navigation = useNavigation();
  const [loginView, setLoginView] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function signupHandler(credentials: Credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;
    console.log("valid submitHandler", emailIsValid, passwordIsValid);

    if (
      !emailIsValid ||
      !passwordIsValid ||
      !emailsAreEqual ||
      !passwordsAreEqual
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    signupAuthenticate({ email, password });
  }

  async function signupAuthenticate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    console.log("authenticate");
    //setIsAuthenticating(true);
    try {
      console.log({ email, password });
      const userData = await createUser(email, password);
      console.log("userData", userData);
      dispatch(
        setUser({
          userId: userData.id,
          userEmail: userData.email,
          token: userData.token,
        })
      );
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please try it later"
      );
    }

    // setIsAuthenticating(false);
  }

  // Login Form
  function loginHandler(credentials: Credentials) {
    let { email, password } = credentials;

    //console.log("valid submitHandler", emailIsValid, passwordIsValid);

    loginAuthenticate({ email, password });
  }

  async function loginAuthenticate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    console.log("authenticate");
    //setIsAuthenticating(true);
    try {
      console.log({ email, password });
      const userData = await login(email, password);
      const userInfo = await fetchUserByEmail(userData.email);
      console.log("login data", userData);
      dispatch(
        setUser({
          userId: userData.id,
          userEmail: userData.email,
          token: userData.token,
        })
      );
      dispatch(
        setUserName({
          name: userInfo?.name,
        })
      );
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Login went wrong! Check your credentials"
      );
    }
  }

  function changeToLoginForm() {
    setLoginView(true);
  }

  function changeToSignupForm() {
    setLoginView(false);
  }

  return (
    <LinearGradient
      colors={colors.primaryGradient}
      style={styles.authContent}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <ScrollView>
        {loginView ? (
          <LoginForm
            isLogin={isLogin}
            onSubmit={loginHandler}
            credentialsInvalid={credentialsInvalid}
            changeForm={changeToSignupForm}
          />
        ) : (
          <SignupForm
            onSubmit={signupHandler}
            changeForm={changeToLoginForm}
            credentialsInvalid={credentialsInvalid}
          />
        )}
      </ScrollView>
    </LinearGradient>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    width: "90%",
  },
  buttons: {
    marginTop: 8,
  },
});
