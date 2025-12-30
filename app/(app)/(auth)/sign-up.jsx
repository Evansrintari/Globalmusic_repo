import { useSignUp } from '@clerk/clerk-expo';
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

export default function SignUp() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({
        emailAddress,
        username,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/(pages)');
      } else {
        Alert.alert('Error', 'Verification incomplete. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Verification Screen
  if (pendingVerification) {
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
                <View style={[styles.iconContainer, { backgroundColor: '#10b981' }]}>
                  <Ionicons name="mail-outline" size={48} color="#fff" />
                </View>
                <Text style={styles.appName}>Check Your Email</Text>
                <Text style={styles.tagline}>
                  We sent a verification code to
                </Text>
                <Text style={styles.emailText}>{emailAddress}</Text>
              </View>
            </View>

            {/* Verification Form */}
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Enter Verification Code</Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.label}>6-Digit Code</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="shield-checkmark-outline" size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    value={code}
                    placeholder="000000"
                    placeholderTextColor="#999"
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    maxLength={6}
                    editable={!loading}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={onVerifyPress}
                disabled={loading}
                activeOpacity={0.8}
              >
                <View style={styles.signBtn}>
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text style={styles.buttonText}>
                    {loading ? 'Verifying...' : 'Verify & Continue'}
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the code? </Text>
                <TouchableOpacity onPress={onSignUpPress}>
                  <Text style={styles.linkText}>Resend</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Secure verification powered by Clerk</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Sign Up Screen
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
                Join the global music competition
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Create Account</Text>

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

            {/* Username Input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#6B7280" />
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  value={username}
                  placeholder="Choose a username"
                  placeholderTextColor="#999"
                  onChangeText={setUsername}
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
                  placeholder="Min 8 characters"
                  placeholderTextColor="#999"
                  secureTextEntry
                  onChangeText={setPassword}
                  editable={!loading}
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={onSignUpPress}
              disabled={loading}
              activeOpacity={0.8}
            >
              <View style={styles.signBtn}>
                <Ionicons name="person-add" size={20} color="white" />
                <Text style={styles.buttonText}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
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

            {/* Sign In Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Already have an account? </Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Sign In</Text>
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
  emailText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    marginTop: 4,
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
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
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