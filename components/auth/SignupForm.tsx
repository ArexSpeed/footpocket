import { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Pressable,
  Text,
  GestureResponderEvent,
} from "react-native";
import { colors } from "../../constants/Colors";

import Input from "./Input";

interface Form {
  onSubmit: any;
  changeForm: () => void;
  credentialsInvalid: {
    [key: string]: boolean;
  };
}

function SignupForm({ onSubmit, changeForm, credentialsInvalid }: Form) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

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
    console.log("submit signup");
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
        <Input
          label="Confirm Email Address"
          onUpdateValue={(value: string) =>
            updateInputValueHandler("confirmEmail", value)
          }
          value={enteredConfirmEmail}
          keyboardType="email-address"
          isInvalid={emailsDontMatch}
        />
        <Input
          label="Password"
          onUpdateValue={(value: string) =>
            updateInputValueHandler("password", value)
          }
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <Input
          label="Confirm Password"
          onUpdateValue={(value: string) =>
            updateInputValueHandler("confirmPassword", value)
          }
          secure
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
        />
        <View style={styles.buttons}>
          <Pressable style={styles.loginBtn} onPress={submitHandler}>
            <Text style={styles.btnText}>Create account</Text>
          </Pressable>
          <View></View>
          <Text style={styles.btnText}>Do you already have an account?</Text>
          <Pressable style={styles.signupBtn} onPress={changeForm}>
            <Text style={styles.btnText}>Login form</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default SignupForm;

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
