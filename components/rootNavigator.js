import { createDrawerNavigator, createStackNavigator, SafeAreaView } from 'react-navigation'
import Login from '../screens/login'
import withTheme from './withTheme'
import { ScrollView } from 'react-native'
import DrawerContent from './drawerContent'
import Home from '../screens/home'
import React from 'react'

const ContentComponent = withTheme(props => {
  const { items, activeItemKey, navigation, theme } = props
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
})

const AuthNavigator = createDrawerNavigator({
  Home: Home
}, {
  initialRouteName: 'Home',
  contentComponent: ContentComponent
})

const RootNavigator = createStackNavigator({
  Login: Login,
  AuthNavigator: AuthNavigator
}, {
  headerMode: 'none',
  initialRouteName: 'Login'
})

export default RootNavigator

