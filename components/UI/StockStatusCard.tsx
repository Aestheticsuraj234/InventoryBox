import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type InventoryCardProps = {
    Moment: string
    Date: string
    TotalStock: number
    StockIn: number
    StockOut: number
    
}

const StockStatusCard = ({ Moment, Date, TotalStock, StockIn, StockOut }: InventoryCardProps) => {
    return (
        <View style={styles.mainStockStatusCard}>
            {/* UpperSection */}
            <View style={styles.upperSection}>
                <Text style={styles.headerText}>{Moment} • <Text style={styles.subHeaderText}>{Date}</Text></Text>
            </View>
            {/* LowerSection */}
            <View style={styles.lowerSection}>
                <ContentContainer title="Total Stock" value={TotalStock} />
                <ContentContainer title="Stock-In" value={StockIn} />
                <ContentContainer title="Stock Out" value={StockOut} />
            </View>
        </View>
    )
}

const ContentContainer = ({ title, value }: { title: string; value: number }) => (
    <View style={styles.contentContainer}>
        <Text style={styles.contentValue}>{value}</Text>
        <Text style={styles.contentTitle}>{title}</Text>
    </View>
);

export default StockStatusCard;

const styles = StyleSheet.create({
    mainStockStatusCard: {
        width: 320,
        height: 140,
        backgroundColor: '#7259D2',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upperSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    lowerSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600'
    },
    subHeaderText: {
        color: '#eee',
        fontSize: 15,
        fontWeight: '400'
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    contentValue: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600'
    },
    contentTitle: {
        color: '#eee',
        fontSize: 15,
        fontWeight: '400'
    }
})
