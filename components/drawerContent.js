import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import withTheme from './withTheme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import findRouteIcon from '../helpers/findRouteIcon'
import findScreenTitle from '../helpers/findScreenTitle'

const DrawerItem = ({ item, activeItem, theme, navigation }) => {
  let focused = false
  if (item.key === activeItem) focused = true
  return (
    <View style={styles.itemContainer}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => navigation.navigate(item.routeName)}
      >
        <View style={[ styles.activeOverlay, { backgroundColor: focused ? theme.secondary : theme.primary } ]}>
          <View style={styles.navigationIcon}>
            <Icon
              name={findRouteIcon(item.key)}
              size={24}
              color={theme.onPrimary}
            />
          </View>
          <Text style={[ styles.itemLabel, { color: theme.onPrimary } ]}>{ findScreenTitle(item.key) }</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const DrawerContent = React.memo(props => {
  const { items, theme, activeItem, navigation } = props
  return (
    <View style={styles.container}>
      <Text style={[ styles.title, { color:theme.onPrimary } ]}>App</Text>
      <FlatList
        data={items}
        extraData={activeItem}
        renderItem={({ item }) => (
          <DrawerItem
            item={item}
            activeItem={activeItem}
            theme={theme}
            navigation={navigation}
          />
        )}
      />
    </View>
  )
})
export default withTheme(DrawerContent)

const styles = StyleSheet.create({
  container: {
    marginBottom: 2
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 5,
    height: 48
  },
  activeOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 1
  },
  navigationIcon: {
    marginRight: 32
  },
  title: {
    fontSize: 22,
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 30,
    fontFamily: 'Lekton-Bold'
  },
  itemLabel: {
    fontSize: 16,
    fontFamily: 'Lekton-Bold'
  }
})