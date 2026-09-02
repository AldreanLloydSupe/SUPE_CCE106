import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");

  const checkInputs = () => {
    if (num1 === "" || num2 === "") {
      setResult("");
      setMessage("Please enter two numbers.");
      return false;
    }

    if (isNaN(Number(num1)) || isNaN(Number(num2))) {
      setResult("");
      setMessage("Invalid input. Numbers only.");
      return false;
    }

    return true;
  };

  const addNumbers = () => {
    if (!checkInputs()) {
      return;
    }

    const answer = Number(num1) + Number(num2);
    setResult(answer.toString());
    setMessage("");
  };

  const subtractNumbers = () => {
    if (!checkInputs()) {
      return;
    }

    const answer = Number(num1) - Number(num2);
    setResult(answer.toString());
    setMessage("");
  };

  const multiplyNumbers = () => {
    if (!checkInputs()) {
      return;
    }

    const answer = Number(num1) * Number(num2);
    setResult(answer.toString());
    setMessage("");
  };

  const divideNumbers = () => {
    if (!checkInputs()) {
      return;
    }

    if (Number(num2) === 0) {
      setResult("");
      setMessage("Cannot divide by zero.");
      return;
    }

    const answer = Number(num1) / Number(num2);
    setResult(answer.toString());
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Calculator</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter first number"
          keyboardType="numeric"
          value={num1}
          onChangeText={setNum1}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter second number"
          keyboardType="numeric"
          value={num2}
          onChangeText={setNum2}
        />

        <TouchableOpacity style={styles.button} onPress={addNumbers}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={subtractNumbers}>
          <Text style={styles.buttonText}>Subtract</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={multiplyNumbers}>
          <Text style={styles.buttonText}>Multiply</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={divideNumbers}>
          <Text style={styles.buttonText}>Divide</Text>
        </TouchableOpacity>

        <Text style={styles.result}>Result: {result}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#EEEEEE",
  },
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999999",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  result: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  message: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});
