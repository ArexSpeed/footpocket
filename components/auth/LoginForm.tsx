import { useState } from "react";
import { StyleSheet, View, Button, Pressable, Text } from "react-native";
import { colors } from "../../constants/Colors";

import Input from "./Input";

interface Form {
  isLogin: boolean;
  onSubmit: any;
  credentialsInvalid: any;
  changeForm: () => void;
}

function LoginForm({
  isLogin,
  onSubmit,
  credentialsInvalid,
  changeForm,
}: Form) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [loginView, setLoginView] = useState(false);

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={(value: string) =>
            updateInputValueHandler("email", value)
          }
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={(value: string) =>
              updateInputValueHandler("confirmEmail", value)
            }
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={(value: string) =>
            updateInputValueHandler("password", value)
          }
          //secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <View style={styles.buttons}>
          <Pressable style={styles.loginBtn}>
            <Text style={styles.btnText}>Log In</Text>
          </Pressable>
          <View></View>
          <Text style={styles.btnText}>You do not have an account?</Text>
          <Pressable style={styles.signupBtn}>
            <Text style={styles.btnText} onPress={changeForm}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  form: {
    //flex: 1,
  },
  buttons: {
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    width: "100%",
    margin: 16,
    borderRadius: 8,
    padding: 8,
    backgroundColor: colors.lightblue,
  },
  signupBtn: {
    width: "100%",
    margin: 16,
    borderRadius: 8,
    padding: 8,
    backgroundColor: colors.blue,
  },
  btnText: {
    fontFamily: "baloo-bold",
    fontSize: 16,
    textAlign: "center",
    color: colors.white,
  },
});
