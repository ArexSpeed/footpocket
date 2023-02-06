import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { colors } from "../../constants/Colors";

interface Content {
  isLogin: boolean;
  onAuthenticate: any;
}

function AuthContent({ isLogin, onAuthenticate }: Content) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  //   function switchAuthModeHandler() {
  //     // Todo
  //     if (isLogin) {
  //       navigation.replace("Signup");
  //     } else {
  //       navigation.replace("Login");
  //     }
  //   }

  //   function submitHandler(credentials) {
  //     let { email, confirmEmail, password, confirmPassword } = credentials;

  //     email = email.trim();
  //     password = password.trim();

  //     const emailIsValid = email.includes("@");
  //     const passwordIsValid = password.length > 6;
  //     const emailsAreEqual = email === confirmEmail;
  //     const passwordsAreEqual = password === confirmPassword;

  //     if (
  //       !emailIsValid ||
  //       !passwordIsValid ||
  //       (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
  //     ) {
  //       Alert.alert("Invalid input", "Please check your entered credentials.");
  //       setCredentialsInvalid({
  //         email: !emailIsValid,
  //         confirmEmail: !emailIsValid || !emailsAreEqual,
  //         password: !passwordIsValid,
  //         confirmPassword: !passwordIsValid || !passwordsAreEqual,
  //       });
  //       return;
  //     }
  //     onAuthenticate({ email, password });
  //   }

  return (
    <LinearGradient
      colors={colors.primaryGradient}
      style={styles.authContent}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <AuthForm
        isLogin={isLogin}
        onSubmit={() => {}}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        {/* <FlatButton onPress={() => {}}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton> */}
      </View>
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
