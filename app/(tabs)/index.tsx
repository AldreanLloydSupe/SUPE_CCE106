import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CounterApp = {
  addBy?: number;
};

function CounterApp({ addBy = 1 }: CounterApp) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((currentCount) => currentCount + addBy);
  };

  const handleDecrement = () => {
    setCount((currentCount) => Math.max(0, currentCount - addBy));
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>
      <Text style={styles.counterValue}>{count}</Text>
      <Text style={styles.helperText}>Add value: {addBy}</Text>

      <View style={styles.buttonRow}>
        <Pressable
          accessibilityRole="button"
          disabled={count === 0}
          onPress={handleDecrement}
          style={({ pressed }) => [
            styles.button,
            styles.secondaryButton,
            count === 0 && styles.disabledButton,
            pressed && count > 0 && styles.pressedButton,
          ]}
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={handleReset}
          style={({ pressed }) => [
            styles.button,
            styles.resetButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={handleIncrement}
          style={({ pressed }) => [
            styles.button,
            styles.primaryButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return <CounterApp addBy={1} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    gap: 12,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  counterValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000000",
  },
  helperText: {
    fontSize: 14,
    color: "#000000",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
  },
  resetButton: {
    backgroundColor: "#FFFFFF",
  },
  disabledButton: {
    opacity: 0.4,
  },
  pressedButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    color: "#000000",
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkboxIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    color: '#333',
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskDate: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    padding: 6,
  },
  deleteText: {
    fontSize: 12,
    color: '#FF4A4A',
    fontWeight: '600',
  },
});