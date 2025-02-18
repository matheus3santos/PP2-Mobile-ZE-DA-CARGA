import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingTop: 48,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginLeft: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  tripCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  protocolText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  tripDetails: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#34495e",
  },
  comprovanteButton: {
    marginTop: 12,
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  comprovanteText: {
    color: "#ffffff",
    fontSize: 16,
  },
  noImageText: {
    marginTop: 12,
    fontSize: 14,
    color: "#e74c3c",
    textAlign: "center",
  },
  noTripsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#7f8c8d",
  },
});
