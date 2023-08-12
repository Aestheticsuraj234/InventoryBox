import { useGlobalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Pressable, FlatList, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { GlobalContext } from "@/context/GlobalContext";
import { LineChart } from 'react-native-chart-kit';
import StockInOut from "@/components/UI/StockInOut";

type Item = {
  id: string;
  image: string;
  itemNames: string;
  quantity: number;
  itemColor: string;
  selectedOption: string[];
  // ... other properties ...
};

export default function ItemDetail() {
  const { items, isStockInOut, setIsStockInOut,StockInQuantity } = useContext(GlobalContext);
  const [item, setItem] = useState<Item | null>(null);

  const { id } = useGlobalSearchParams();

  useEffect(() => {
    const selectedItem = items.find((t: Item) => t.id === id);
    if (selectedItem) {
      setItem(selectedItem);
    }
  }, [id, items]);


  const truncatedId = item?.id ? (item.id.length > 10 ? item.id.slice(0, 10) + " . . . " : item.id) : "";

  const quantityChange = item ? item.quantity - StockInQuantity : 0;

  // The chartData array should show both the initial quantity and the quantity change
  const chartData = [StockInQuantity || 0, quantityChange || 0];

  const chartLabels = ['Initial-Quantity', 'Current-Quantity'];

  if (!item) {
    return <Text>Something Went Wrong, App is Under Maintenance</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Container-1 aka UpperContainer */}
      <View style={styles.upperContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item?.image }} alt="No Image" style={{ width: 90, height: 84, borderRadius: 10 }} />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailsIdtextContainer}>
            <Text style={{ fontStyle: "italic", fontWeight: "600", color: "#0450C2", fontSize: 12 }}>{truncatedId}</Text>
          </View>
          <Text style={{ fontStyle: "normal", fontWeight: "600", fontSize: 14, marginTop: 4 }}>{item?.itemNames}</Text>
          <View style={styles.detailsQuantityContainer}>
            <Pressable style={{ width: 35, height: 35, padding: 7, backgroundColor: "#0450C2", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontStyle: "normal", fontWeight: "600", fontSize: 14, color: "#fff" }}>{item?.quantity}</Text>
            </Pressable>
            <Text style={{ fontStyle: "normal", fontWeight: "600", fontSize: 14 }}>Quantity</Text>
          </View>
        </View>
      </View>

      {/* Container-2 aka MiddleContainer */}
      <View style={styles.MiddleContainer}>
        <View style={styles.itemDetailsContainer}>
          <Text style={{ fontStyle: "normal", fontWeight: "600", fontSize: 14 }}>Color</Text>
          <Text style={{ fontStyle: "normal", fontWeight: "600", fontSize: 14 }}>{item?.itemColor}</Text>
        </View>
        <View style={styles.itemDetailsContainer}>
          <Text style={{ fontStyle: "normal", fontWeight: "600", fontSize: 14 }}>Size</Text>
          <View style={styles.tagContainer}>
            <FlatList
              data={item.selectedOption}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.tag} >
                  <Text style={styles.tagText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              horizontal // Set horizontal to true for a horizontal list
            />
          </View>
        </View>
        <View style={styles.stockinOutContainer}>
          <Pressable style={styles.button} onPress={() => setIsStockInOut(!isStockInOut)}>
            <Text style={{ fontStyle: "normal", fontWeight: "600", fontSize: 14, color: '#fff' }}>Stock in/out</Text>
          </Pressable>
        </View>
      </View>

      {/* Container-3 aka BottomContainer */}
      <View style={styles.BottomContainer}>
        <LineChart
          data={{
            labels: chartLabels,
            datasets: [{ data: chartData }],
          }}
          width={Dimensions.get('window').width - 20}
          height={210}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 1,
            borderRadius: 16,
          }}
        />
        {isStockInOut && (
          <StockInOut
            ID={item?.id}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    position: "relative",

  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    height: "33%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 10,
  },
  imageContainer: {
    width: 90,
    height: 84,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 20,
    width: "100%",
    height: "auto",
    borderRadius: 10,



  },
  detailsIdtextContainer: {
    width: "auto",
    height: "auto",
    borderRadius: 8,
    backgroundColor: '#A8CBFF',
    padding: 3,


  },
  detailsQuantityContainer: {
    width: "auto",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 3,
    marginTop: 30,
  },
  MiddleContainer: {

    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "33%",
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemDetailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "auto",

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
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  tagText: {
    color: '#61677A',
    marginRight: 6,
    fontSize: 12,
    fontWeight: 'bold',
  },
  BottomContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "33%",
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,

  },
  stockinOutContainer: {
    width: "100%",
    height: "auto",
    borderRadius: 8,
    padding: 3,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",

  },
  button: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#0450C2',
    padding: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  }

})