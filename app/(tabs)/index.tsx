import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/UI/Header'
import StockStatusCard from '@/components/UI/StockStatusCard'
import CardComponent from '@/components/UI/CardComponent'

const iconsLabels = [
  { name: 'archive', label: 'Register new items', color: '#FFD95A' },
];
const stockIconLable=[

  { name: 'box', label: 'Stock In', color: '#19A7CE' },
  { name: 'box-open', label: 'Stock Out', color: '#ED2B2A' },
]

const HomeScreen = () => {
  return (
   <ScrollView>
    <View style={styles.HomeMainContainer}>
{/* header */}
<Header/>
{/* Home title */}
<Text style={styles.HomeMainContainerHeader}>Home</Text>

{/* Stock Status card */}
<StockStatusCard Moment="Today" Date="28/7/2023" TotalStock={100} StockIn={50} StockOut={50}/>
{/* Add Item card */}


<CardComponent HeaderText="Add Item🚀" iconsLabels={iconsLabels} />
{/* Stock-IN / Out card */}
<CardComponent HeaderText="Stock-IN / Out" iconsLabels={stockIconLable} />
    </View>
   </ScrollView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  HomeMainContainer:{
    marginTop:30,
    flex:1,
    backgroundColor:"#fff",
    paddingHorizontal:10,
   
  },

  HomeMainContainerHeader:{
    fontSize:20,
    fontWeight:"bold",
    marginHorizontal:10,
    marginVertical:10,
    color:"#27374D",
  }
})