import React, { useState } from "react";
import { View, Image, SafeAreaView, StyleSheet, TextInput, Button, Alert } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";

const MainContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #F5FCFF;
  padding-top: 50px;
`;

const ImageContainer = styled(View)`
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

interface TextInputExampleProps {
  text: string;
  number: string;
  onChangeText: (text: string) => void;
  onChangeNumber: (number: string) => void;
}

const TextInputExample: React.FC<TextInputExampleProps> = ({ text, onChangeText, number, onChangeNumber }) => {
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Correo"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        secureTextEntry={true}
        value={number}
        placeholder="Contraseña"
      />
    </SafeAreaView>
  );
};

// Función para validar la contraseña
const validatePassword = (password: string): boolean => {
  const minLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);

  return minLength && hasNumber && hasUpperCase;
};

// Función para validar el correo electrónico
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
});

const Index = () => {
  const [text, setText] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const router = useRouter();

  const onPressLearnMore = () => {
    if (!validateEmail(text)) {
      Alert.alert(
        "Correo inválido",
        "Por favor, ingresa un correo electrónico válido."
      );
      return;
    }

    if (!validatePassword(number)) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe tener al menos 8 caracteres, incluir un número y una letra mayúscula."
      );
      return;
    }

    Alert.alert("Inicio de sesión exitoso", "Bienvenido");
    setText('');
    setNumber('');
  };

  const onPressRegister = () => {
    router.push({
      pathname: "./register",
    });
  };

  return (
    <MainContainer>
      <ImageContainer>
        <Image
          source={require("./src/escudo6.jpg")}
          style={{ width: 150, height: 150 }}
        />
      </ImageContainer>

      <TextInputExample
        text={text}
        onChangeText={setText}
        number={number}
        onChangeNumber={setNumber}
      />

      <Button
        onPress={onPressLearnMore}
        title="Continuar"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <Button
        onPress={onPressRegister}
        title="Register"
        color="#841584"
        accessibilityLabel="Register button"
      />
    </MainContainer>
  );
};

export default Index;
