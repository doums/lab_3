import { createStackNavigator } from 'react-navigation'
import Login from '../screens/login'
import SignUp from '../screens/signUp'
import Navigator from './navigator'

const RootNavigator = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  Navigator: Navigator
}, {
  headerMode: 'none',
  initialRouteName: 'Login'
})

export default RootNavigator

