import { useRouter } from 'expo-router';
import { Award, LogOut, Music } from 'lucide-react-native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../contexts/AppContext';

export default function JudgeScreen() {
  const router = useRouter();
  const { submissions, currentUserId, clearRole } = useApp();

  const myAssignments = submissions.filter((s) => s.assignedJudgeId === currentUserId);
  const pendingReviews = myAssignments.filter((s) => s.status === 'assigned');
  const completedReviews = myAssignments.filter((s) => s.status === 'judged');

  const handleLogout = async () => {
    await clearRole();
    router.replace('/');
  };

  const renderSubmission = ({ item }) => (
    <TouchableOpacity
      style={styles.submissionCard}
      onPress={() => router.push(`/rate?submissionId=${item.id}`)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={item.status === 'judged' ? ['#134e4a', '#1e3a3a'] : ['#1e293b', '#334155']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <View style={styles.musicIcon}>
            <Music size={20} color={item.status === 'judged' ? '#34d399' : '#6366f1'} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardArtist}>by {item.artistName}</Text>
          </View>
        </View>

        {item.rating ? (
          <View style={styles.ratedContainer}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
              <Text style={styles.ratingMax}>/10</Text>
            </View>
            <Text style={styles.reviewedLabel}>Reviewed</Text>
          </View>
        ) : (
          <View style={styles.pendingContainer}>
            <Text style={styles.pendingText}>Tap to review</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a2e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Judge Panel</Text>
            <Text style={styles.headerSubtitle}>{myAssignments.length} assignments</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <LogOut size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#f59e0b', '#ef4444']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statGradient}
            >
              <Text style={styles.statNumber}>{pendingReviews.length}</Text>
              <Text style={styles.statLabel}>To Review</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#34d399', '#10b981']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statGradient}
            >
              <Text style={styles.statNumber}>{completedReviews.length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </LinearGradient>
          </View>
        </View>

        {myAssignments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Award size={48} color="#4b5563" strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>No assignments yet</Text>
            <Text style={styles.emptyText}>
              Waiting for admin to assign submissions to you
            </Text>
          </View>
        ) : (
          <FlatList
            data={myAssignments}
            renderItem={renderSubmission}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  submissionCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  musicIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
  ratedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ratingText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#34d399',
  },
  ratingMax: {
    fontSize: 14,
    color: '#9ca3af',
    marginLeft: 2,
  },
  reviewedLabel: {
    fontSize: 13,
    color: '#34d399',
    fontWeight: '600',
  },
  pendingContainer: {
    alignItems: 'center',
  },
  pendingText: {
    fontSize: 13,
    color: '#f59e0b',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
