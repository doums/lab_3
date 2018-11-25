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
import * as firebase from 'firebase'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      mod: 'login',
      error: ''
    }
  }

  componentDidMount () {
    const { user, navigation: { replace } } = this.props
    if (user) replace('Navigator')
  }

  login = () => {
    const { email, password } = this.state
    if (!email || !password) return
  }

  signUp = () => {
    const { email, password } = this.state
    console.log("1")
    if (!email || !password) return
    console.log("2")
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
      this.setState({ error })
    })
  }

  render () {
    const { theme } = this.props
    const { email, password, mod, error } = this.state
    const textStyle = [ styles.text, { color: theme.onBackground } ]
    const errorStyle = [ styles.text, { color: theme.error } ]
    console.log(this.props)
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
