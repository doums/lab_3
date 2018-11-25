import { createStackNavigator } from 'react-navigation'
import Login from '../screens/login'
import Navigator from './navigator'

const RootNavigator = createStackNavigator({
  Login: Login,
  Navigator: Navigator
}, {
  headerMode: 'none',
  initialRouteName: 'Login'
})

export default RootNavigator

