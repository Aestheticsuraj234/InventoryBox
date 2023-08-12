import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/UI/Header'
import StockStatusCard from '@/components/UI/StockStatusCard'
import CardComponent from '@/components/UI/CardComponent'
import { Link } from 'expo-router';
import { GlobalContext } from '@/context/GlobalContext'
import { useContext } from 'react';


const iconsLabels = [
  { name: 'archive', label: 'Register new items', color: '#FFD95A' },
];
const stockIconLable = [

  { name: 'box', label: 'Stock In', color: '#19A7CE' },
  { name: 'box-open', label: 'Stock Out', color: '#ED2B2A' },
]

const HomeScreen = () => {
  const { totalStock , StockInQuantity ,
    StockOutQuantites } = useContext(GlobalContext);
  console.log(totalStock)
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  // const totalStock = 100;
  const stockIn = StockInQuantity;
  const stockOut = StockOutQuantites;

  return (

    <View style={styles.HomeMainContainer}>
      {/* header */}
      <Header />
      {/* Home title */}
      <Text style={styles.HomeMainContainerHeader}>Home</Text>

      {/* Stock Status card */}

      <StockStatusCard Moment="Today" Date={formattedDate} TotalStock={totalStock} StockIn={stockIn} StockOut={stockOut} />

      {/* Add Item card */}

      <Link href="/items" style={styles.CardComponentContainer} >
        <CardComponent HeaderText="Add Item🚀" iconsLabels={iconsLabels} />
      </Link>

      {/* Stock-IN / Out card */}
      <Link href="/StockManagement" style={styles.CardComponentContainer}>
        <CardComponent HeaderText="Stock-IN / Out" iconsLabels={stockIconLable} />
      </Link>

    </View>

  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  HomeMainContainer: {
    marginTop: 30,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    maxHeight: "100%",

  },

  HomeMainContainerHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 10,
    color: "#27374D",
  },
  CardComponentContainer:{
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,


  }
})