import React, { Component } from 'react'
import {
  StyleSheet, TextInput,
  View
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withUser from '../components/withUser'
import Button from '../components/button'
import * as firebase from 'firebase'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount () {
    const { user, navigation: { replace } } = this.props
    if (user) replace('Navigator')
  }


  render () {
    const { theme, navigation: { navigate } } = this.props
    const { email, password } = this.state
    console.log(this.props)
    return (
      < View style={[ styles.container, { backgroundColor: theme.background } ]}>
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
          text='sign up'
          onPress={this.signUp}
          disabled={!email || !password}
        />
        <Button
          text='login'
          onPress={() => navigate('Login')}
        />
      </View>
    )
  }
}

export default compose(
  withTheme,
  withUser
)(SignUp)

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
