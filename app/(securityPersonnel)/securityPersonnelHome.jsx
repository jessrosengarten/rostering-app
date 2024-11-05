import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { db } from '../../Backend/firebaseConfig';
import { ref, onValue } from 'firebase/database';

const { width, height } = Dimensions.get('window');

const SecurityHome = () => {
    const [shifts, setShifts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedShift, setSelectedShift] = useState(null); // Store shift to be canceled
    const personnel = "Rudolf Stassen";

    useEffect(() => {
        const shiftsRef = ref(db, 'Shifts');
        onValue(shiftsRef, (snapshot) => {
            const data = snapshot.val();
            console.log('Fetched data:', data);

            const personnelShifts = [];
            for (const week in data) {
                if (data[week].personnel === personnel) {
                    personnelShifts.push(data[week]);
                }
            }
            personnelShifts.sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return dateA - dateB;
            });

            console.log('Filtered shifts:', personnelShifts);
            setShifts(personnelShifts);
        });
    }, []);

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString.split('/').reverse().join('-'));
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    const handleCancelPress = (shift) => {
        setSelectedShift(shift);
        setModalVisible(true);
    };

    const confirmCancelShift = () => {
        console.log("Shift canceled:", selectedShift);
        setModalVisible(false);
        // Additional cancellation logic can be added here
    };

    return (
        <SafeAreaView edges={[]}>
            <ImageBackground source={images.background} style={styles.background}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Shifts</Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        {shifts.map((shift, index) => (
                            <View key={index} style={styles.shiftBox}>
                                <View style={styles.shiftDetails}>
                                    <Text>
                                        <Text style={styles.labelText}>Day: </Text>
                                        <Text style={styles.normalText}>{getDayOfWeek(shift.date)}</Text>
                                    </Text>
                                    <View style={{ height: 10 }} />
                                    <Text>
                                        <Text style={styles.labelText}>Club: </Text>
                                        <Text style={styles.normalText}>{shift.club}</Text>
                                    </Text>
                                    <Text>
                                        <Text style={styles.labelText}>Shift Time: </Text>
                                        <Text style={styles.normalText}>
                                            {shift.startTime} - {shift.endTime}
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => handleCancelPress(shift)}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* Confirmation Modal */}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                Are you sure you want to cancel your shift on{' '}
                                {selectedShift ? getDayOfWeek(selectedShift.date) : ''} at{' '}
                                {selectedShift ? selectedShift.club : ''}?
                            </Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.backButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.confirmButton}
                                    onPress={confirmCancelShift}
                                >
                                    <Text style={styles.buttonText}>Confirm Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
    },
    header: {
        width: '100%',
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    container: {
        padding: 20,
    },
    shiftBox: {
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    shiftDetails: {
        flex: 1,
        marginRight: 10,
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    normalText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#333',
    },
    buttonContainer: {
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#E21A1A',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        minWidth: 100,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: width * 0.8,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    backButton: {
        backgroundColor: '#d3d3d3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 10,
    },
    confirmButton: {
        backgroundColor: '#E21A1A',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default SecurityHome;
