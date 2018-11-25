import React, { Component } from 'react'
import {
  View,
  StatusBar
} from 'react-native'
import ThemeContext, { materialTheme } from '../constants/themeContext'
import UserContext from '../constants/userContext'
import firebase from 'firebase'
import RootNavigator from './rootNavigator'

class ContextManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: materialTheme,
      user: null
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      console.log('auth observer triggered')
      console.log(user)
      this.setState({ user })
    })
  }

  setTheme = theme => this.setState({ theme })

  setUser = user => this.setState({ user })

  render () {
    const { theme, user } = this.state
    const themeContextValue = {
      data: theme,
      setTheme: this.setTheme
    }
    const userContextValue = {
      data: user,
      setUser: this.setUser
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle='light-content'
          backgroundColor={theme.primaryDark}
        />
        <ThemeContext.Provider value={themeContextValue}>
          <UserContext.Provider value={userContextValue}>
            <RootNavigator />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </View>
    )
  }
}
export default ContextManager