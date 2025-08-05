import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AppLogo from '@/assets/images/logo.png';

const LandingPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Image source={AppLogo} style={styles.image} />
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: '#0772d6ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingPage;