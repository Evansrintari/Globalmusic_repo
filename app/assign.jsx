import { useRouter, useLocalSearchParams } from 'expo-router';
import { X, UserCheck } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../contexts/AppContext';

export default function AssignScreen() {
  const router = useRouter();
  const { submissionId } = useLocalSearchParams();
  const { submissions, judges, updateSubmission } = useApp();
  const [selectedJudgeId, setSelectedJudgeId] = useState('');

  const submission = submissions.find((s) => s.id === submissionId);

  if (!submission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Submission not found</Text>
      </View>
    );
  }

  const handleAssign = () => {
    if (!selectedJudgeId) {
      Alert.alert('Error', 'Please select a judge');
      return;
    }

    updateSubmission(submission.id, {
      assignedJudgeId: selectedJudgeId,
      status: 'assigned',
    });

    Alert.alert('Success', 'Submission assigned successfully!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a2e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.header}>
          <Text style={styles.title}>Assign Judge</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <X size={24} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <View style={styles.submissionInfo}>
          <Text style={styles.infoLabel}>Submission</Text>
          <Text style={styles.infoTitle}>{submission.title}</Text>
          <Text style={styles.infoArtist}>by {submission.artistName}</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Select a Judge</Text>

          <View style={styles.judgesList}>
            {judges.map((judge) => {
              const isSelected = selectedJudgeId === judge.id;
              const isCurrent = submission.assignedJudgeId === judge.id;

              return (
                <TouchableOpacity
                  key={judge.id}
                  style={styles.judgeCard}
                  onPress={() => setSelectedJudgeId(judge.id)}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={
                      isSelected
                        ? ['#6366f1', '#4f46e5']
                        : isCurrent
                        ? ['#1e3a3a', '#134e4a']
                        : ['#1e293b', '#334155']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.judgeGradient}
                  >
                    <View style={styles.judgeInfo}>
                      <View
                        style={[
                          styles.judgeIcon,
                          {
                            backgroundColor: isSelected
                              ? 'rgba(255, 255, 255, 0.2)'
                              : isCurrent
                              ? 'rgba(52, 211, 153, 0.2)'
                              : 'rgba(99, 102, 241, 0.2)',
                          },
                        ]}
                      >
                        <UserCheck
                          size={20}
                          color={isSelected ? '#ffffff' : isCurrent ? '#34d399' : '#6366f1'}
                        />
                      </View>
                      <View style={styles.judgeDetails}>
                        <Text style={styles.judgeName}>{judge.name}</Text>
                        {isCurrent && (
                          <Text style={styles.currentLabel}>Currently assigned</Text>
                        )}
                      </View>
                    </View>
                    {isSelected && (
                      <View style={styles.selectedBadge}>
                        <Text style={styles.selectedText}>Selected</Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.assignButton, !selectedJudgeId && styles.assignButtonDisabled]}
            onPress={handleAssign}
            disabled={!selectedJudgeId}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={selectedJudgeId ? ['#6366f1', '#4f46e5'] : ['#4b5563', '#374151']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.assignGradient}
            >
              <Text style={styles.assignText}>Assign to Judge</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
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
  submissionInfo: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
    fontWeight: '600',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  infoArtist: {
    fontSize: 14,
    color: '#d1d5db',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d1d5db',
    marginBottom: 16,
  },
  judgesList: {
    gap: 12,
  },
  judgeCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  judgeGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  judgeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  judgeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  judgeDetails: {
    flex: 1,
  },
  judgeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  currentLabel: {
    fontSize: 12,
    color: '#34d399',
    marginTop: 2,
  },
  selectedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  selectedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  footer: {
    padding: 24,
    paddingTop: 16,
  },
  assignButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  assignButtonDisabled: {
    opacity: 0.5,
  },
  assignGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  assignText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
  },
});
