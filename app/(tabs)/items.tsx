import React, { useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { GlobalContext } from '@/context/GlobalContext';


type ItemCardType = {
  item: {
    id: string;
    itemNames: string;
    itemColor: string;
    selectedOption: string[];
    quantity: number;
    image: string;

  }
}
const ItemCard = ({ item }: ItemCardType) => {
  
  const { deleteItem } = useContext(GlobalContext);

  return (
    
      <Link href={`/itemDetail/${item.id}`} style={{ margin: 10 }}>
        <View style={styles.mainItemContainer}>
          {/* First container */}
          <TouchableOpacity style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
          </TouchableOpacity>

          {/* Second container */}
          <View style={styles.middleContainer}>
            <Text style={styles.title}>
              {item.itemNames.length > 20 ? `${item.itemNames.slice(0, 20)}...` : item.itemNames}
            </Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Color: <Text style={styles.infoValue}>{item.itemColor}</Text>
              </Text>
              <View style={styles.sizeContainer}>
                <Text style={styles.infoText}>Size:</Text>
                <View style={styles.tagContainer}>
                  <FlatList
                    data={item.selectedOption}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.tag}>
                        <Text style={styles.tagText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    horizontal
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Third container */}
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable style={styles.deleteBtn}>
            <FontAwesome5
              name="trash"
              size={18}
              color="#27374D"
              onPress={() => deleteItem(item.id)}
            />
          </Pressable>
        </View>
      </Link>
   
  );
};


const ItemsList = () => {
  const { items } = useContext(GlobalContext);
  console.log(items)
  return (
    <View style={styles.container}>
      <View style={styles.topHeaderFilterContainer}>
        <Text style={styles.filtertext}>All</Text>
        <FontAwesome5 name="chevron-down" size={18} color="#27374D" />
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={require('@/assets/images/empty.png')}
          />
          <Text style={styles.emptyText}>No Items Found</Text>
        </View>
      ) : (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',

        }}>

          <FlatList
            data={items}
            renderItem={({ item }) => <ItemCard item={item} />}
            keyExtractor={(item) => item.id}
            style={styles.itemList}
            contentContainerStyle={styles.itemListContent}
          />
        </View>
      )}

      <Link href={"/AddItem"} style={styles.addBtnContainer}>
        <View style={styles.addButton}>
          <FontAwesome5 name="plus" size={18} color="#fff" />
        </View>
      </Link>
    </View>
  );
};

export default ItemsList;
const styles = StyleSheet.create({
  filtertext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27374D',
  },
  container: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topHeaderFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 0.25,
    borderBottomColor: '#ccc',
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
    elevation: 3,
  },
  addBtnContainer: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    width: 30,
    height: 30,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainItemContainer: {
    // position: "relative",
    width: 338,
    height: 127,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align the main container to the top
    marginBottom: 10,
  },
  deleteBtn:{
    position: 'absolute',
    top: 10,
    right: 1,
    width: 30,
    height: 30,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  

  }
,
  imageContainer: {
    width: 68.16,
    height: 68.16,
    borderRadius: 11.36,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  middleContainer: {
    marginTop: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Align items to the left
    marginLeft: 10,
    marginRight: 10,

  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27374D',
    textAlign: "left", // Align the title text to the left
    alignSelf: 'flex-start', // Align the title itself to the left within its container
  },

  tagContainer: {
    width: 80,
    flexDirection: 'row',
    marginTop: 2,


  },
  tag: {
    backgroundColor: '#CBFFA9',
    borderColor: '#8EAC50',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  tagText: {
    color: '#61677A',
    marginRight: 6,
    fontSize: 9,
    fontWeight: 'bold',
  },
  quantityText: {
    position: 'absolute',
    top: 20,
    right: 40,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C87E1',

  },
  // New styles for FlatList
  itemList: {
    flex: 1,
    width: '100%',
  },
  itemListContent: {
    paddingBottom: 20,
  },
  itemImage: {
    width: 68.16,
    height: 68.16,
    borderRadius: 11.36,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  infoText: {
    fontSize: 14, fontWeight: "600"
  },
  infoValue: {
    fontWeight: "700",
    color: "#9288F8"
  },
  sizeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 5,
    borderLeftWidth: 2,
    borderLeftColor: "#635E63",
  },
  sizeTag: {
    backgroundColor: '#CBFFA9',
    borderColor: '#8EAC50',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  sizeTagText: {
    color: '#61677A',
    marginRight: 6,
    fontSize: 9,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyImage: {
    width: 300,
    height: 300,
    marginBottom: 2,
    objectFit: 'contain',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27374D',
  },
});

