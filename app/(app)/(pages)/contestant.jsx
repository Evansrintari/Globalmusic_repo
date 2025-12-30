import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { LogOut, Music, Plus } from 'lucide-react-native';
import { useState } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../../../contexts/AppContext';

export default function ContestantScreen() {
  const router = useRouter();
  const { submissions, currentUserId, clearRole } = useApp();
  const [scaleAnim] = useState(new Animated.Value(1));

  const mySubmissions = submissions.filter((s) => s.contestantId === currentUserId);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleLogout = async () => {
    await clearRole();
    router.replace('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#fbbf24';
      case 'assigned':
        return '#60a5fa';
      case 'judged':
        return '#34d399';
      default:
        return '#9ca3af';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'assigned':
        return 'Under Review';
      case 'judged':
        return 'Judged';
      default:
        return status;
    }
  };

  const renderSubmission = ({ item }) => (
    <View style={styles.submissionCard}>
      <LinearGradient
        colors={['#1e293b', '#334155']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <View style={styles.musicIcon}>
            <Music size={20} color="#6366f1" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardArtist}>{item.artistName}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
          {item.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
              <Text style={styles.ratingLabel}>/10</Text>
            </View>
          )}
        </View>

        {item.feedback && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackLabel}>Feedback:</Text>
            <Text style={styles.feedbackText}>{item.feedback}</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a2e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>My Submissions</Text>
            <Text style={styles.headerSubtitle}>{mySubmissions.length} total</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <LogOut size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {mySubmissions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Music size={48} color="#4b5563" strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>No submissions yet</Text>
            <Text style={styles.emptyText}>
              Submit your first track to get started
            </Text>
          </View>
        ) : (
          <FlatList
            data={mySubmissions}
            renderItem={renderSubmission}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => router.push('/submit')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
          >
            <LinearGradient
              colors={['#6366f1', '#4f46e5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fabGradient}
            >
              <Plus size={28} color="#ffffff" strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
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
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ratingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34d399',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginLeft: 2,
  },
  feedbackContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  feedbackLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
    fontWeight: '600',
  },
  feedbackText: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
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
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 32,
    elevation: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
