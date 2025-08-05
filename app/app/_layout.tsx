import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: "lightblue",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "" }} />
        <Stack.Screen name="register" options={{ headerTitle: "Register" }} />
        <Stack.Screen name="login" options={{ headerTitle: "Login" }} />
        <Stack.Screen name="otp-verify" options={{ headerTitle: "OTP-Verify" }} />
        <Stack.Screen name="home" options={{ headerTitle: "Home" }} />
        <Stack.Screen name="add-patient" options={{ headerTitle: "Add Patient" }} />
        <Stack.Screen name="add-reports" options={{ headerTitle: "Add Reports" }} />
        <Stack.Screen name="see-visits" options={{ headerTitle: "See Visits" }} />
        <Stack.Screen name="add-visits" options={{ headerTitle: "Add Visits" }} />
        <Stack.Screen name="total-patients" options={{ headerTitle: "Total Patients" }} />
        <Stack.Screen name="total-reports" options={{ headerTitle: "Total Reports" }} />
      </Stack>
      
      <Toast />
    </>
  );
};

export default RootLayout;
