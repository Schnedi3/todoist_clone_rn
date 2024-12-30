import { StyleSheet, View } from "react-native";
import * as Linking from "expo-linking";
import { useOAuth } from "@clerk/clerk-expo";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";

import { useWarmUpBrowser } from "@/src/hooks/useWarmUpBrowser";
import { LoginButton } from "@/src/components/LoginButton";
import { Colors } from "@/src/constants/Colors";

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
}

export default function Login(): JSX.Element {
  useWarmUpBrowser();
  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: Strategy.Google,
  });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: Strategy.Apple });

  const handleLogin = async (social: Strategy) => {
    const selectedStrategy = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
    }[social];

    try {
      const { createdSessionId, setActive } = await selectedStrategy({
        redirectUrl: Linking.createURL("/login", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("@/assets/images/todoist-logo.png")}
        style={styles.logo}
        entering={FadeInLeft.springify().delay(100)}
      />
      <Animated.Image
        source={require("@/assets/images/login.png")}
        style={styles.header}
        entering={FadeInRight.springify().delay(250)}
      />

      <Animated.View
        style={styles.buttonContainer}
        entering={FadeInDown.springify().delay(400)}
      >
        <LoginButton
          onPress={() => handleLogin(Strategy.Google)}
          iconName="logo-google"
          buttonText="Continue with Google"
        />

        <LoginButton
          onPress={() => handleLogin(Strategy.Apple)}
          iconName="logo-apple"
          buttonText="Continue with Apple"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.secondaryBg,
  },
  logo: {
    width: "60%",
    height: 120,
    top: "5%",
    alignSelf: "center",
    resizeMode: "contain",
  },
  header: {
    width: "100%",
    height: 280,
    top: "10%",
    resizeMode: "contain",
  },
  buttonContainer: {
    gap: 10,
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 150,
  },
});
