import React, { Component } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withUser from '../components/withUser'
import Button from '../components/button'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import Spinner from '../components/spinner'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: 'toto@toto.toto',
      password: 'tototo',
      mod: 'login',
      error: '',
      isBusy: false
    }
  }

  componentDidMount () {
    const { user, navigation: { replace } } = this.props
    if (user) replace('AuthNavigator')
  }

  componentDidUpdate (prevProps) {
    const { user, navigation: { replace } } = this.props
    const { user: prevUser } = prevProps
    if (user && !prevUser) replace('AuthNavigator')
  }

  login = async () => {
    const { email, password, isBusy } = this.state
    if (!email || !password || isBusy) return
    this.setState({ isBusy: true })
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (e) {
      this.setState({ error: e.message })
      this.setState({ isBusy: false })
    }
  }

  signUp = async () => {
    const { email, password, isBusy } = this.state
    if (!email || !password || isBusy) return
    this.setState({ isBusy: true })
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (e) {
      this.setState({ error: e.message })
      this.setState({ isBusy: false })
    }
  }

  render () {
    const { theme } = this.props
    const { email, password, mod, error, isBusy } = this.state
    const textStyle = [ styles.text, { color: theme.onBackground } ]
    const errorStyle = [ styles.text, { color: theme.error, marginBottom: 10 } ]
    if (isBusy) return <Spinner/>
    return (
      < View style={[ styles.container, { backgroundColor: theme.background } ]}>
        { error.length > 0 &&
        <Text
          onPress={() => this.setState({ error: '' })}
          style={errorStyle}
        >
          { error }
        </Text>
        }
        <TextInput
          style={[ styles.text, styles.textInput, { color: theme.onBackground, borderColor: theme.onBackground } ]}
          placeholder='email'
          placeholderTextColor={theme.onBackground}
          onChangeText={email => this.setState({ email })}
          keyboardType='email-address'
          value={email}
        />
        <TextInput
          style={[ styles.text, styles.textInput, { color: theme.onBackground, borderColor: theme.onBackground } ]}
          placeholder='password'
          placeholderTextColor={theme.onBackground}
          onChangeText={password => this.setState({ password })}
          value={password}
        />
        <Button
          text={mod === 'login' ? 'login' : 'sign up'}
          onPress={mod === 'login' ? this.login : this.signUp}
          disabled={!email || !password}
        />
        <Text
          onPress={() => this.setState({ mod: mod === 'login' ? 'signUp' : 'login' })}
          style={textStyle}
        >
          { mod === 'login' ? 'or sign up' : 'or login' }
        </Text>
      </View>
    )
  }
}

export default compose(
  withTheme,
  withUser
)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontFamily: 'Lekton-Regular'
  },
  textInput: {
    borderWidth: 1,
    width: 200,
    paddingHorizontal: 20,
    marginBottom: 10
  }
})
