import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Participant');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const roles = ['Participant', 'Administrator', 'Judge'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder='your@email.com'
        keyboardType='email-address'
        autoCapitalize='none'
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder='Enter your password'
        secureTextEntry
      />

      <Text style={styles.label}>Login As</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={styles.dropdownText}>{selectedRole}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdownList}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role}
              style={[
                styles.dropdownItem,
                selectedRole === role && styles.selectedItem
              ]}
              onPress={() => {
                setSelectedRole(role);
                setDropdownVisible(false);
              }}
            >
              <Text style={[
                styles.dropdownItemText,
                selectedRole === role && styles.selectedItemText
              ]}>
                {role}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupText}>New here? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedItem: {
    backgroundColor: '#2563eb',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItemText: {
    color: '#fff',
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  signupText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
});

export default LoginForm;