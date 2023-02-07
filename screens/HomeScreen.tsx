import { useState, useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import AuthContent from "../components/auth/AuthContent";
import SignupForm from "../components/auth/SignupForm";
import Container from "../components/Container";

import EditScreenInfo from "../components/EditScreenInfo";
import Message from "../components/Message";
import { Text, View } from "../components/Themed";
import UserCard from "../components/UserCard";
import { AuthContext } from "../context/auth-context";
import { RootTabScreenProps } from "../types";
import { createUser } from "../util/auth";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { setMessage } from "../context/slices/messageSlice";
import { setUser } from "../context/slices/userSlice";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  // async function signupHandler({
  //   email,
  //   password,
  // }: {
  //   email: string;
  //   password: string;
  // }) {
  //   console.log("authenticate");
  //   setIsAuthenticating(true);
  //   try {
  //     console.log({ email, password });
  //     const token = await createUser(email, password);
  //     console.log(token, "tkn");
  //     // dispatch(setUser({
  //     //   id: ,
  //     //   userName:
  //     // }));
  //     authCtx.authenticate();
  //   } catch (error) {
  //     Alert.alert(
  //       "Authentication failed",
  //       "Could not create user, please try it later"
  //     );
  //   }

  //   setIsAuthenticating(false);
  // }
  return (
    <Container>
      {user.userId ? (
        <UserCard />
      ) : (
        <AuthContent isLogin={true} />
        // <SignupForm onSubmit={() => {}} />
      )}
      <Message />
      <Text>{user.userId}</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
