import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5 } from '@expo/vector-icons';
import CardComponent from '@/components/UI/CardComponent';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topHeaderFilterContainer}>
        <Text style={styles.filtertext}>All</Text>
        <FontAwesome5 name="chevron-down" size={18} color="#27374D" />
      </View>
      <Link href={"/AddItem"} style={{marginTop:30}}>
        <CardComponent
          HeaderText="Add Items"
          iconsLabels={[
            { name: 'box', label: 'Start Managing Your Stock', color: '#F2994A' },
          ]}
        />
      </Link>
      <Image
        style={{ width: 300, height: 300, marginTop: 2, marginBottom: 2, objectFit: 'contain' }}
        source={require('@/assets/images/empty.png')}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#27374D' }}>
        No Items Found
      </Text>
      <Link href={"/AddItem"} style={styles.addBtnContainer}>
        <View style={styles.addButton}>
          <FontAwesome5 name="plus" size={18} color="#fff" />
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Change 'space-between' to 'flex-start'
    // backgroundColor: '#F2F2F2',
  },
  topHeaderFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0.25,
    borderBottomColor: '#ccc',

  },
  filtertext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27374D',
  },
  addButton: {
    backgroundColor: '#27374D',
    width: 70,
    height: 70,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 3
  },
  addBtnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
