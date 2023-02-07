import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { RootState } from "../context/store";
import { setMessage } from "../context/slices/messageSlice";
import { colors } from "../constants/Colors";

const Message = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state: RootState) => state.message);

  const handlePress = () => {
    dispatch(setMessage("Message from Component"));
  };

  return (
    <View>
      <Text style={styles.text}>{message}</Text>
      <Button title={"Set Message"} onPress={handlePress} />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  text: {
    color: colors.white,
  },
});
