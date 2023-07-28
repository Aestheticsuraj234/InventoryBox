import { StyleSheet, Text, View , Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.headermainContainer}>
      <Image 
        source={require('../../assets/images/avatar.jpg')}
        style={{width: 50, height: 50, borderRadius: 50/2 }}
      />
      <View style={styles.headerRightSideContainer}>
        {/* icon of add */}
        <TouchableHighlight
          underlayColor="#eee" // Color when pressed
          onPress={() => {
            // Add your logic for when the icon is pressed here
          }}
          style={styles.IconTouchEfectContainer}
        >
          <AntDesign name="plus" size={30} color="#27374D" />
        </TouchableHighlight> 
        <TouchableHighlight
          underlayColor="#eee" // Color when pressed
          onPress={() => {
            // Add your logic for when the icon is pressed here
          }}
          style={styles.IconTouchEfectContainer}
        >
          <FontAwesome name="bell" size={24} color="#27374D" />
        </TouchableHighlight> 
        
     
      </View>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  headermainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerRightSideContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  IconTouchEfectContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50/2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
})
