import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
   <Stack >
     <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="contestant" options={{ title: "Submit Music" }} />
      <Stack.Screen name="admin" options={{ title: "Admin Dashboard" }} />
      <Stack.Screen name="judge" options={{ title: "Judge Panel" }} />
      <Stack.Screen name="submit" options={{ title: "New Submission", presentation: "modal" }} />
      <Stack.Screen name="assign" options={{ title: "Assign Judge", presentation: "modal" }} />
      <Stack.Screen name="rate" options={{ title: "Rate Submission", presentation: "modal" }} />
   </Stack>
  )
}