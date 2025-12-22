import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { mockJudges, mockSubmissions } from '../mocks/data';

const STORAGE_KEY_SUBMISSIONS = 'music_submissions';
const STORAGE_KEY_USER_ROLE = 'user_role';
const STORAGE_KEY_USER_ID = 'user_id';

export const [AppContext, useApp] = createContextHook(() => {
  const [submissions, setSubmissions] = useState([]);
  const [currentRole, setCurrentRole] = useState(null);
  const [currentUserId, setCurrentUserId] = useState('');
  const [judges] = useState(mockJudges);

  const submissionsQuery = useQuery({
    queryKey: ['submissions'],
    queryFn: async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY_SUBMISSIONS);
        return stored ? JSON.parse(stored) : mockSubmissions;
      } catch {
        return mockSubmissions;
      }
    },
  });

  const roleQuery = useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      try {
        const role = await AsyncStorage.getItem(STORAGE_KEY_USER_ROLE);
        const userId = await AsyncStorage.getItem(STORAGE_KEY_USER_ID);
        return { role: role, userId: userId || '' };
      } catch {
        return { role: null, userId: '' };
      }
    },
  });

  const syncSubmissionsMutation = useMutation({
    mutationFn: async (newSubmissions) => {
      await AsyncStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(newSubmissions));
      return newSubmissions;
    },
  });

  const setRoleMutation = useMutation({
    mutationFn: async ({ role, userId }) => {
      await AsyncStorage.setItem(STORAGE_KEY_USER_ROLE, role);
      await AsyncStorage.setItem(STORAGE_KEY_USER_ID, userId);
      return { role, userId };
    },
  });

  useEffect(() => {
    if (submissionsQuery.data) {
      setSubmissions(submissionsQuery.data);
    }
  }, [submissionsQuery.data]);

  useEffect(() => {
    if (roleQuery.data) {
      setCurrentRole(roleQuery.data.role);
      setCurrentUserId(roleQuery.data.userId);
    }
  }, [roleQuery.data]);

  const addSubmission = (submission) => {
    const updated = [...submissions, submission];
    setSubmissions(updated);
    syncSubmissionsMutation.mutate(updated);
  };

  const updateSubmission = (id, updates) => {
    const updated = submissions.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    );
    setSubmissions(updated);
    syncSubmissionsMutation.mutate(updated);
  };

  const selectRole = (role, userId) => {
    setCurrentRole(role);
    setCurrentUserId(userId);
    setRoleMutation.mutate({ role, userId });
  };

  const clearRole = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY_USER_ROLE);
    await AsyncStorage.removeItem(STORAGE_KEY_USER_ID);
    setCurrentRole(null);
    setCurrentUserId('');
  };

  return {
    submissions,
    judges,
    currentRole,
    currentUserId,
    isLoading: submissionsQuery.isLoading || roleQuery.isLoading,
    addSubmission,
    updateSubmission,
    selectRole,
    clearRole,
  };
});
