import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        paddingBottom: 60,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 16,
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 15,
        width: "90%",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 15,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    tripInfo: {
        marginVertical: 15,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
        paddingHorizontal: 10,
    },
    infoLabel: {
        fontSize: 16,
        color: "#666",
        fontWeight: "500",
    },
    infoValue: {
        fontSize: 16,
        color: "#333",
        fontWeight: "600",
        flex: 1,
        textAlign: "right",
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        gap: 10,
    },
    rejectButton: {
        flex: 1,
        backgroundColor: "#ff4444",
        borderRadius: 8,
        paddingVertical: 12,
    },
    acceptButton: {
        flex: 1,
        backgroundColor: "#4CAF50",
        borderRadius: 8,
        paddingVertical: 12,
    },
});