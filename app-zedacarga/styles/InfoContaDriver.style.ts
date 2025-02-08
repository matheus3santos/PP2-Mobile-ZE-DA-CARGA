import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
    addButton: {
        backgroundColor: 'orange',
        borderRadius: 8
    },
    cardContainer: {
        padding: 15
    },
    accountCard: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    icon: {
        marginBottom: 15
    },
    infoText: {
        color: 'black',
        marginVertical: 5
    },
    noAccountContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    noAccountText: {
        color: 'black',
        fontSize: 16
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black'
    },
    input: {
        width: '100%',
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20
    },
    cancelButton: {
        backgroundColor: '#ddd',
        flex: 1,
        marginRight: 10
    },
    confirmButton: {
        backgroundColor: 'orange',
        flex: 1,
        marginLeft: 10
    }
});