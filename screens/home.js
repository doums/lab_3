import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withActionBar from '../components/withActionBar'
import withUser from '../components/withUser'

const Home = ({ theme, user, navigation: { navigate } }) => {
  console.log('home')
  console.log(user)
  return (
    <View style={[ styles.container, { backgroundColor: theme.background } ]}>
    </View>
  )}

export default compose(
  withActionBar,
  withTheme,
  withUser
)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10
  }
})
