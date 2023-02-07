import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";

import { colors } from "../../constants/Colors";

interface Input {
  label: string;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  onUpdateValue: (value: string) => void;
  value: string;
  isInvalid?: boolean;
}

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}: Input) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: colors.red,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: colors.gray,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: colors.lightred,
  },
});
