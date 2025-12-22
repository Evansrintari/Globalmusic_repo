import { useRouter } from 'expo-router';
import { Shield, LogOut, UserCheck } from 'lucide-react-native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../contexts/AppContext';

export default function AdminScreen() {
  const router = useRouter();
  const { submissions, judges, clearRole } = useApp();

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');
  const assignedSubmissions = submissions.filter((s) => s.status === 'assigned');
  const judgedSubmissions = submissions.filter((s) => s.status === 'judged');

  const handleLogout = async () => {
    await clearRole();
    router.replace('/');
  };

  const renderSubmission = ({ item }) => {
    const assignedJudge = judges.find((j) => j.id === item.assignedJudgeId);

    return (
      <TouchableOpacity
        style={styles.submissionCard}
        onPress={() => router.push(`/assign?submissionId=${item.id}`)}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={['#1e293b', '#334155']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardArtist}>by {item.artistName}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            {assignedJudge ? (
              <View style={styles.judgeInfo}>
                <UserCheck size={14} color="#60a5fa" />
                <Text style={styles.judgeText}>{assignedJudge.name}</Text>
              </View>
            ) : (
              <Text style={styles.unassignedText}>Tap to assign</Text>
            )}
            {item.rating && (
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}/10</Text>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderSection = (title, data, color) => {
    if (data.length === 0) return null;

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIndicator, { backgroundColor: color }]} />
          <Text style={styles.sectionTitle}>{title}</Text>
          <View style={styles.sectionBadge}>
            <Text style={styles.sectionBadgeText}>{data.length}</Text>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={renderSubmission}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    );
  };

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a2e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Admin Dashboard</Text>
            <Text style={styles.headerSubtitle}>{submissions.length} submissions</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <LogOut size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#fbbf24', '#f59e0b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradient}
              >
                <Text style={styles.statNumber}>{pendingSubmissions.length}</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#60a5fa', '#3b82f6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradient}
              >
                <Text style={styles.statNumber}>{assignedSubmissions.length}</Text>
                <Text style={styles.statLabel}>In Review</Text>
              </LinearGradient>
            </View>

            <View style={styles.statCard}>
              <LinearGradient
                colors={['#34d399', '#10b981']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statGradient}
              >
                <Text style={styles.statNumber}>{judgedSubmissions.length}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </LinearGradient>
            </View>
          </View>

          {renderSection('Pending Assignment', pendingSubmissions, '#fbbf24')}
          {renderSection('Under Review', assignedSubmissions, '#60a5fa')}
          {renderSection('Judged', judgedSubmissions, '#34d399')}

          {submissions.length === 0 && (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Shield size={48} color="#4b5563" strokeWidth={1.5} />
              </View>
              <Text style={styles.emptyTitle}>No submissions yet</Text>
              <Text style={styles.emptyText}>
                Waiting for contestants to submit their music
              </Text>
            </View>
          )}
        </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 2,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIndicator: {
    width: 4,
    height: 16,
    borderRadius: 2,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  sectionBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
  },
  submissionCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  cardArtist: {
    fontSize: 14,
    color: '#9ca3af',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  judgeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  judgeText: {
    fontSize: 13,
    color: '#60a5fa',
    fontWeight: '500',
  },
  unassignedText: {
    fontSize: 13,
    color: '#fbbf24',
    fontWeight: '500',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34d399',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 48,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(75, 85, 99, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
});
