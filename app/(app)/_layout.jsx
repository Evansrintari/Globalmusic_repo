import { useAuth } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'

import { ActivityIndicator, View, StyleSheet } from 'react-native'
// import '../../global.css'

function Layout() {
    const {isLoaded, isSignedIn, userId, sessionId, getToken} = useAuth()
    console.log("isSignedIn >>>.", isSignedIn)

    if(!isLoaded){
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' color="#0000ff"/>
            </View>
        )
    }
  return (
   <Stack screenOptions={{ headerBackTitle: "Back" }}>
    <Stack.Protected guard={isSignedIn}>
     <Stack.Screen name='(pages)' options={{headerShown:false}}/>
    </Stack.Protected>
    <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name='(auth)' options={{headerShown:false}}/>
    </Stack.Protected>
     
       
    </Stack> 
  )
}

export default Layout

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    loading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})