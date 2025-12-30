import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../../contexts/AppContext';

export default function SubmitScreen() {
  const router = useRouter();
  const { addSubmission, currentUserId } = useApp();
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !artistName.trim() || !audioUrl.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    const newSubmission = {
      id: `s${Date.now()}`,
      title: title.trim(),
      artistName: artistName.trim(),
      audioUrl: audioUrl.trim(),
      contestantId: currentUserId,
      contestantName: artistName.trim(),
      submittedAt: new Date(),
      status: 'pending',
    };

    addSubmission(newSubmission);

    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Your submission has been received!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 500);
  };

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a2e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}>Submit Your Music</Text>
              <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                <X size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Track Title</Text>
                <TextInput
                  style={styles.input}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter track title"
                  placeholderTextColor="#6b7280"
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Artist Name</Text>
                <TextInput
                  style={styles.input}
                  value={artistName}
                  onChangeText={setArtistName}
                  placeholder="Enter your artist name"
                  placeholderTextColor="#6b7280"
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Audio URL</Text>
                <TextInput
                  style={[styles.input, styles.urlInput]}
                  value={audioUrl}
                  onChangeText={setAudioUrl}
                  placeholder="https://example.com/track.mp3"
                  placeholderTextColor="#6b7280"
                  autoCapitalize="none"
                  keyboardType="url"
                  multiline
                />
                <Text style={styles.hint}>
                  Paste a direct link to your audio file
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={isSubmitting ? ['#4b5563', '#374151'] : ['#6366f1', '#4f46e5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.submitGradient}
              >
                <Text style={styles.submitText}>
                  {isSubmitting ? 'Submitting...' : 'Submit Track'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    gap: 24,
    marginBottom: 32,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d1d5db',
    marginBottom: 4,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#ffffff',
  },
  urlInput: {
    minHeight: 60,
    paddingTop: 14,
  },
  hint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
  },
});
