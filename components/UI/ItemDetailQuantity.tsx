import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import React, { useContext, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { GlobalContext } from '@/context/GlobalContext';
import { TextInput } from 'react-native-gesture-handler';
import { Platform, ToastAndroid } from 'react-native';



const ItemDetailQuantity = ({ ID }: any) => {
    const {
        items,
        isQuantityModalOpen,
        setIsQuantityModalOpen,
        updateExistingQuantity,
        StockInQuantity, setStockInQuantity

    } = useContext(GlobalContext);

    const item = items.find((t: any) => t.id === ID);
    console.log("ItemDetailAdd:", item)



    const handleIncrement = () => {
        setStockInQuantity((prevQuantity: number) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (StockInQuantity > 0) {
            setStockInQuantity((prevQuantity: number) => prevQuantity - 1);
        }
    };
    const handleApply = () => {
        // Update the item quantity using the temporaryQuantity
        updateExistingQuantity(item?.id, StockInQuantity);
        
        setIsQuantityModalOpen(false);
        ToastAndroid.show("Item Quantity Updated Successfully", ToastAndroid.SHORT);
    };


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
                        <Text style={styles.header}>Stock In From Here.</Text>
                        <Text style={styles.subHeading}>{item?.itemNames}</Text>

                        <View style={styles.MiddleContainer}>
                            <Pressable style={styles.operationCircle}
                                onPress={handleDecrement}
                            >
                                <AntDesign name="minus" size={24} color="#175CFC" />
                            </Pressable>
                            <TextInput
                                style={styles.input}
                                value={StockInQuantity.toString()}
                                onChangeText={(text) => {
                                    const numValue = parseInt(text) || 0;
                                    setStockInQuantity(numValue);
                                   
                                }}
                                keyboardType="number-pad"
                            />
                            <Pressable style={styles.operationCircle}

                                onPress={handleIncrement}
                            >
                                <AntDesign name="plus" size={24} color="#175CFC" />
                            </Pressable>
                        </View>
                      
                        <View style={styles.subMiddelContainer}>
                            <Text style={styles.middleSubSectiontext}>
                                {item?.quantity}
                            </Text>
                            <AntDesign name="arrowright" size={24} color="black" />
                            <Text style={[styles.middleSubSectiontext, { color: '#45D02F' }]}>
                                {StockInQuantity + item?.quantity}
                            </Text>
                        </View>

                        <View style={styles.bottomContainer}>
                            <Pressable
                                style={styles.btn}
                                onPress={() => setIsQuantityModalOpen(false)}
                            >
                                <Text style={[styles.textStyle, { color: '#1E1E1E' }]}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.btn, { backgroundColor: '#2776EE' }]}
                                // onPress={}
                                onPress={handleApply}
                            >
                                <Text style={[styles.textStyle, { color: '#fff' }]}>Apply</Text>
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

export default ItemDetailQuantity