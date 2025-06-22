import { emailAtom } from "@/store/login";
import { twFullConfig } from "@/utils/twconfig";
import { useSignIn, useSignUp, useSSO } from "@clerk/clerk-expo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";
import { Link, useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const [loading, setLoading] = useState<"google" | "apple" | "email" | false>(
    false
  );
  const [iTermsChecked, setITermsChecked] = useState(false);
  const [email, setEmail] = useState("");

  const setEmailAtom = useSetAtom(emailAtom);
  const { startSSOFlow } = useSSO();
  const { signUp } = useSignUp();
  const { signIn, setActive } = useSignIn();
  const router = useRouter();

  const handleSignInWithSSO = async (
    strategy: "oauth_google" | "oauth_apple"
  ) => {};

  const handleEmailOTP = async () => {};

  const signInWithEmail = async () => {};

  const handleLinkPress = (linkType: "terms" | "privacy") => {
    Linking.openURL(
      linkType === "terms" ? "https://www.google.com" : "https://www.google.com"
    );
  };

  return (
    <View className="flex-1 bg-black pt-safe">
      <View className="flex-1 p-6">
        <View className="flex-row justify-end">
          <Link href="/faq" asChild>
            <TouchableOpacity className="bg-gray-700 rounded-xl p-2">
              <Feather name="help-circle" size={28} color="white" />
            </TouchableOpacity>
          </Link>
        </View>

        <View className="items-center py-8">
          <Image
            source={require("@/assets/images/convex.png")}
            className="w-40 h-40"
          />
        </View>

        <Text className="text-gray-400 text-md text-center font-Poppins_400Regular">
          AI-powered captions editor
        </Text>

        <TextInput
          className="bg-gray-800 text-gray-300 rounded-xl p-4 my-8"
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View className="flex-row items-center">
          <Checkbox
            value={iTermsChecked}
            onValueChange={setITermsChecked}
            className="mr-4"
            color={
              iTermsChecked
                ? (twFullConfig.theme.colors as any).primary
                : undefined
            }
          />

          <Text className="text-gray-400 text-md font-Poppins_500Medium flex-1 flex-wrap">
            I agree to the{" "}
            <Text
              className="text-white underline"
              onPress={() => handleLinkPress("terms")}
            >
              Terms of Service
            </Text>{" "}
            and acknowledge Captions{" "}
            <Text
              className="text-white underline"
              onPress={() => handleLinkPress("privacy")}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={signInWithEmail}
          disabled={!email || !iTermsChecked || loading === "email"}
          className={`w-full py-4 rounded-lg mt-10 transition-colors duration-300 
            ${!email || !iTermsChecked || loading === "email" ? "bg-gray-800" : "bg-primary"}`}
        >
          {/* email*/}
          {loading === "email" ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center text-white text-lg font-Poppins_600SemiBold">
              Continue
            </Text>
          )}
        </TouchableOpacity>

        {/* apple */}
        <TouchableOpacity
          onPress={() => handleSignInWithSSO("oauth_apple")}
          disabled={!!loading}
          className={`w-full py-4 rounded-lg flex-row justify-center items-center bg-gray-800`}
        >
          {loading === "apple" ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="logo-apple" size={24} color="white" />
              <Text className="text-center ml-3 text-base text-white font-Poppins_600SemiBold">
                Continue with Apple
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* google */}
        <TouchableOpacity
          onPress={() => handleSignInWithSSO("oauth_google")}
          disabled={!!loading}
          className={`w-full py-4 mt-4 rounded-lg flex-row justify-center items-center bg-gray-800`}
        >
          {loading === "google" ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Ionicons name="logo-google" size={24} color="white" />
              <Text className="text-center ml-3 text-base text-white font-Poppins_600SemiBold">
                Continue with Google
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
