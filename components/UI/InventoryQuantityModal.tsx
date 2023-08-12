import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { TextInput } from 'react-native-gesture-handler';
type Props = {

}


const InventoryQuantityModal = (props: Props) => {
    const {
        isQuantityModalOpen,
        setIsQuantityModalOpen,
        decrement, // Provide the decrement function
        increment, // Provide the increment function
        quantity, // Provide the quantity state variable
        setQuantity,
        itemNames,
        saveItemWithQuantity
    } = useContext(GlobalContext);

    const [initialQuantity, setInitialQuantity] = useState(quantity);
    const [finalQuantity, setFinalQuantity] = useState(quantity);

    // Update the initial quantity whenever the modal is opened
    useEffect(() => {
        setInitialQuantity(quantity);
        setFinalQuantity(quantity);
    }, [isQuantityModalOpen]);

    // Update the final quantity whenever the quantity state changes
    useEffect(() => {
        setFinalQuantity(quantity);
    }, [quantity]);


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isQuantityModalOpen}
                onRequestClose={() => {
                    setIsQuantityModalOpen(!isQuantityModalOpen);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.header}>Input Inventory quantity.</Text>
                        {/* Wanted to add name of the product we are adding  */}
                        <Text style={styles.subHeading}>
                            {itemNames === "" ? "No Name Available" : itemNames}
                        </Text>

                        <View style={styles.MiddleContainer}>
                            <Pressable style={styles.operationCircle} 
                                onPress={decrement} // Call the decrement function 
                            
                            >
                                <AntDesign name="minus" size={24} color="#175CFC" />
                            </Pressable>
                            <TextInput
                                style={styles.input}
                                value={quantity.toString()} // Updated state variable
                                onChangeText={(text) => {
                                    const numValue = parseInt(text) || 0;
                                    setQuantity(numValue);
                                }}
                                keyboardType='number-pad'
                            />
                            <Pressable style={styles.operationCircle}
                                onPress={increment} // Call the increment function
                            >
                                <AntDesign name="plus" size={24} color="#175CFC" />
                            </Pressable>
                        </View>
                        {/* Wanted to show here intial and final quanity firts text is showing intial state of quantity & 
                        second text is showing final state of quantity ater incrementing or decrementing it can we achieve that                        
                        */}
                        <View style={styles.subMiddelContainer}>
                            <Text style={[styles.middleSubSectiontext, { color: "#61677A" }]}>
                                 {initialQuantity}
                            </Text>
                            <AntDesign name="arrowright" size={24} color="black" />
                            <Text style={[styles.middleSubSectiontext, { color: "#45D02F" }]}>
                               {finalQuantity}
                            </Text>
                        </View>

                        <View style={styles.bottomContainer}>
                            <Pressable
                                style={styles.btn}
                                onPress={() => setIsQuantityModalOpen(!isQuantityModalOpen)}
                            >
                                <Text style={[styles.textStyle, { color: "#1E1E1E" }]}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.btn, { backgroundColor: "#2776EE" }]}
                                onPress={saveItemWithQuantity}
                            >
                                <Text style={[styles.textStyle, { color: "#fff" }]}>Apply</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};




const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 340,
        height: 390,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'left',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: 20,
        color: "#61677A"

    },
    MiddleContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 20,
    },
    operationCircle: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: 'rgba(140, 207, 244, 0.30)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#175CFC'

    },
    input: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    subMiddelContainer: {

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 20,
        gap: 20,

    },
    middleSubSectiontext: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#61677A"

    },
    bottomContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 20,
        gap: 20,

    },
    btn: {
        width: 130,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#BABABA',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    }
});

export default InventoryQuantityModal