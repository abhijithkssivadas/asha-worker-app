import { Stack } from "expo-router";

const RootLayout = ()=> {
  return <Stack 
    screenOptions={{
      headerStyle:{
        backgroundColor:"#fff",
      },
      headerTintColor:'black',
      headerTitleStyle:{
        fontSize:20,
        fontWeight: 'bold',
      },
      contentStyle:{
        backgroundColor:"lightblue",
      },
    }}>
      <Stack.Screen name="index" options={{ title: ''}} />
      <Stack.Screen name="register" options={{ headerTitle: 'Register'}} />
      <Stack.Screen name="login" options={{ headerTitle: 'Login'}} />
      <Stack.Screen name="otpVerify" options={{ headerTitle: 'Login'}} />
  </Stack>
}

export default RootLayout;