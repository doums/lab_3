import React, { Component } from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  Text
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from './withTheme'
import withUser from './withUser'
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from 'react-native-firebase'

class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
    this.listRef = React.createRef()
  }

  componentDidMount () {
    this.unsubscribe = firebase.firestore().collection('messages')
      .onSnapshot(querySnapshot => {
        const messages = []
        querySnapshot.forEach(async doc => {
          messages.push({ key: doc.id, ...doc.data() })

        })
        this.setState({ messages })
      })
  }

  componentDidUpdate (prevProps, prevState, snapshot) {

  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  renderItem = ({ item }) => {
    const { theme, user } = this.props
    const textStyle = [ styles.text, { color: theme.onBackground } ]
    const rowStyle = {}
    if (user.id === item.author.id) {
      rowStyle.alignSelf = 'flex-end'
    }
    return (
      <View style={[ styles.row, rowStyle ]}>
        <View style={[ styles.messageWrapper ]}>
          <Text style={[ styles.author, { color: theme.onBackground } ]}>{ item.author.username }</Text>
          <Text style={textStyle}>{ item.message }</Text>
        </View>
        {
          user.id === item.author.id &&
          <View style={styles.moreIcon}>
            <Icon
              name='more-horiz'
              size={24}
              color={theme.primary}
              onPress={() => {}}
            />
          </View>
        }
      </View>
    )
  }

  render () {
    const { theme } = this.props
    const { messages } = this.state
    console.log(messages)
    return (
      <View style={[ styles.container, { borderColor: theme.onBackground } ]}>
        <FlatList
          inverted
          data={messages}
          renderItem={this.renderItem}
          style={styles.list}
          ref={this.listRef}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    )
  }
}

export default compose(
  withTheme,
  withUser
)(Feed)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderWidth: 1,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontFamily: 'Lekton-Regular'
  },
  author: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontFamily: 'Lekton-Bold'
  },
  list: {
    padding: 20
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10
  },
  moreIcon: {
    marginLeft: 'auto'
  },
  messageWrapper: {
    flexDirection: 'column'
  }
})