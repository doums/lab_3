import React from 'react'
import { ScrollView } from 'react-native'
import { createDrawerNavigator, SafeAreaView } from 'react-navigation'
import Home from '../screens/home'
import withTheme from './withTheme'
import DrawerContent from './drawerContent'

const Navigator = ({ theme }) => {
  const ContentComponent = props => {
    const { items, activeItemKey, navigation } = props
    return (
      <ScrollView style={{backgroundColor: theme.primary}}>
        <SafeAreaView style={{flex: 1, backgroundColor: theme.primary}} forceInset={{top: 'always', horizontal: 'never'}}>
          <DrawerContent
            items={items}
            activeItem={activeItemKey}
            navigation={navigation}
          />
        </SafeAreaView>
      </ScrollView>
    )
  }

  const DrawerNavigator = createDrawerNavigator({
    Home: Home
  }, {
    initialRouteName: 'Home',
    contentComponent: ContentComponent
  })
  return <DrawerNavigator />
}
export default withTheme(Navigator)