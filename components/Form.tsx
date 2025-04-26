import { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { lightColors } from "@/theme";
import { UserContext } from "@/contexts";

export default function Form() {
  const [numberOfPeople, setNumberOfPeople] = useState<string>("");
  const [checkedStatus, setCheckedStatus] = useState<boolean[]>(
    Array.from({ length: 2 }, () => false)
  );
  const { updateUserContextValue } = useContext(UserContext);

  const handleChangeText = (text: string) => {
    let numericText = text.replace(/[^0-9]/g, "");

    if (numericText.startsWith("0")) {
      numericText = numericText.replace(/^0+/, "");
    }

    updateUserContextValue({
      numberOfPeople: numericText ? Number(numericText) : 0,
    });
    setNumberOfPeople(numericText);
  };

  const handleValueChange = (isChecked: boolean, index: number) => {
    if (index === 0) {
      updateUserContextValue({
        hasChild: isChecked,
      });
    } else {
      updateUserContextValue({
        hasSenior: isChecked,
      });
    }

    setCheckedStatus((prevStatus) => {
      const status = [...prevStatus];
      status[index] = isChecked;
      return status;
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, { width: "90%", marginBottom: 10 }]}>
        <Text style={styles.label}>인원</Text>
        <TextInput
          style={styles.input}
          placeholder="인원을 입력해주세요."
          placeholderTextColor={lightColors.common.color}
          value={numberOfPeople}
          onChangeText={handleChangeText}
        />
      </View>
      <View style={[styles.row, { width: "90%" }]}>
        <Text style={styles.label}>기타</Text>
        <Pressable
          style={[styles.row, styles.margin]}
          onPress={() => handleValueChange(!checkedStatus[0], 0)}
        >
          <Checkbox
            color={lightColors.common.primaryColor}
            value={checkedStatus[0]}
            onValueChange={(isChecked: boolean) =>
              handleValueChange(isChecked, 0)
            }
          />
          <Text style={styles.label}>유아</Text>
        </Pressable>
        <Pressable
          style={styles.row}
          onPress={() => handleValueChange(!checkedStatus[1], 1)}
        >
          <Checkbox
            color={lightColors.common.primaryColor}
            value={checkedStatus[1]}
            onValueChange={(isChecked: boolean) =>
              handleValueChange(isChecked, 1)
            }
          />
          <Text style={styles.label}>노인</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.common.backgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  margin: {
    marginRight: 5,
  },
  label: {
    color: lightColors.common.color,
    marginLeft: 5,
    marginRight: 10,
  },
  input: {
    width: "70%",
    borderWidth: 1,
    borderColor: lightColors.common.primaryColor,
    borderRadius: 10,
  },
});
