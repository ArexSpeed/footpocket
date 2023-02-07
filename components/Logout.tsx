import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../constants/Colors";
import { useDispatch } from "react-redux";
import { resetUser } from "../context/slices/userSlice";

function Logout() {
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(resetUser());
  }
  return (
    <Pressable onPress={logoutHandler}>
      <FontAwesome
        name="power-off"
        size={25}
        color={colors.white}
        style={{ marginRight: 15 }}
      />
    </Pressable>
  );
}

export default Logout;
