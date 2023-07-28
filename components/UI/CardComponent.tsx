import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

type IconsLabelProps = {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  label: string;
  color: string;
};

function IconsLabel(props: IconsLabelProps) {
  return (
    <View style={styles.iconLabelContainer}>
      <FontAwesome5 size={18} style={{ marginBottom: -3 }} {...props} />
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#27374D' }}>{props.label}</Text>
    </View>
  );
}

type CardComponentProps = {
  HeaderText: string;
  iconsLabels: IconsLabelProps[];
};

const CardComponent = ({ HeaderText, iconsLabels }: CardComponentProps) => {
  return (
    <View style={styles.cardMainContainer}>
      <View style={styles.upperSection}>
        <Text style={styles.headerText}>{HeaderText}</Text>
      </View>
      <View style={styles.listMainContainer}>
        {iconsLabels.map((labelProps, index) => (
          <View key={index} style={styles.listContainer}>
            <IconsLabel {...labelProps} />
            <FontAwesome5 name="chevron-right" size={18} color="#27374D" />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  cardMainContainer: {
    width: 320,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  upperSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27374D',
  },
  listMainContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  iconLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
});
