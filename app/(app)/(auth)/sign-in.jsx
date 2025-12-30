import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleSignIn from '../../components/GoogleSignin';

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    if(!emailAddress || !password){
      Alert.alert("Error", "Please Fill in sll fields")
    }

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(pages)');
      } else {
        Alert.alert('Error', 'Sign in incomplete. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.sectionContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerDesc}>
              <View style={styles.iconContainer}>
                <Ionicons name="musical-notes" size={48} color="#fff" />
              </View>
              <Text style={styles.appName}>SoundJury</Text>
              <Text style={styles.tagline}>
                Where talent meets professional judgment
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Welcome Back</Text>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                  editable={!loading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  value={password}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  onChangeText={setPassword}
                  editable={!loading}
                />
              </View>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={onSignInPress}
              disabled={loading}
              activeOpacity={0.8}
            >
              <View style={styles.signBtn}>
                <Ionicons name="log-in" size={20} color="white" />
                <Text style={styles.buttonText}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            {/* Google Sign In */}
            <GoogleSignIn />

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Start your career today</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  headerDesc: {
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#3b82f6',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  formContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#1f2937',
    fontSize: 16,
    padding: 0,
    borderWidth: 0,
    outlineWidth: 0,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  signBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    backgroundColor: '#d1d5db',
    height: 1,
  },
  dividerText: {
    color: '#9ca3af',
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 14,
    color: '#6b7280',
  },
  linkText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
  },
});