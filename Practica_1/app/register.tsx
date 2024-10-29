import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
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

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();

  // Validaciones
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const minLength = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    return minLength && hasNumber && hasUpperCase;
  };

  const onPressRegister = () => {
    // Validar que todos los campos están completos
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Campos incompletos", "Por favor, rellena todos los campos.");
      return;
    }

    // Validar correo electrónico
    if (!validateEmail(email)) {
      Alert.alert("Correo inválido", "Por favor, ingresa un correo electrónico válido.");
      return;
    }

    // Validar la contraseña
    if (!validatePassword(password)) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe tener al menos 8 caracteres, incluir un número y una letra mayúscula."
      );
      return;
    }

    // Validar confirmación de contraseña
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    // Si todo es válido, redirigir a la pantalla Index
    Alert.alert("Registro exitoso", "Bienvenido");
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    router.push({
        pathname:"/",
  });
  };

  // Estilos
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 250,
    },
    buttonContainer: {
      marginTop: 20,
    },
  });

  return (
    <MainContainer>
      <Text>Registro</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.buttonContainer}>
        <Button title="Registrar" onPress={onPressRegister} color="#841584"
        />
      </View>
    </MainContainer>
  );
}
