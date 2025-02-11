import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f6fa',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f6fa',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      paddingTop: 48,
    },
    backButton: {
      padding: 8,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginLeft: 16,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    tripCard: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    tripHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    protocolText: {
      marginLeft: 12,
      fontSize: 16,
      fontWeight: '600',
      color: '#2c3e50',
    },
    tripDetails: {
      gap: 12,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    locationText: {
      flex: 1,
    },
    locationLabel: {
      fontSize: 14,
      color: '#7f8c8d',
      marginBottom: 2,
    },
    locationValue: {
      fontSize: 16,
      color: '#2c3e50',
      fontWeight: '500',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    infoText: {
      fontSize: 14,
      color: '#7f8c8d',
    },
    valueText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#27ae60',
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
    },
    statusLabel: {
      fontSize: 14,
      color: '#7f8c8d',
    },
    statusValue: {
      fontSize: 16,
      fontWeight: '600',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      gap: 16,
    },
    emptyText: {
      fontSize: 16,
      color: '#7f8c8d',
      textAlign: 'center',
    },
  });