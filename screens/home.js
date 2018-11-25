import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withActionBar from '../components/withActionBar'

const Home = ({ theme, navigation: { navigate } }) => (
  <View style={[ styles.container, { backgroundColor: theme.background } ]}>
  </View>
)

export default compose(
  withActionBar,
  withTheme
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
