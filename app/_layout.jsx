import { ClerkProvider } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppContext } from "../contexts/AppContext";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import '../global.css';

SplashScreen.preventAutoHideAsync();


{/* */}
const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <ClerkProvider  tokenCache={tokenCache}>
    <Slot/>
    </ClerkProvider>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </AppContext>
    </QueryClientProvider>
  );
}
