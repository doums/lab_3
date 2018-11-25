import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import withTheme from './withTheme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import findScreenTitle from '../helpers/findScreenTitle'

const withActionBar = WrappedComponent => {
  class ActionBarHoc extends Component {
    constructor (props) {
      super(props)
      const { navigation: { openDrawer, state: { routeName } }, theme } = props
      const navigationIcon = (
        <Icon
          name='menu'
          size={24}
          color={theme.onPrimary}
          onPress={() => openDrawer()}
        />
      )
      this.state = {
        navigationIcon,
        actionItems: null,
        title: findScreenTitle(routeName)
      }
    }

    setNavigationIcon = navigationIcon => {
      this.setState({ navigationIcon })
    }

    setTitle = title => {
      this.setState({ title })
    }

    setActionItems = reactElement => {
      this.setState({ actionItems: reactElement })
    }

    render () {
      const { navigationIcon, actionItems, title } = this.state
      const { theme } = this.props
      const actionBarProps = {
        setNavigationIcon: this.setNavigationIcon,
        setTitle: this.setTitle,
        setActionItems: this.setActionItems
      }
      return (
        <View style={{flex: 1}}>
          <View style={[styles.actionBarContainer, {backgroundColor: theme.primary}]}>
            <View style={styles.actionBarContent}>
              <View style={styles.navigationIcon}>
                {
                  React.isValidElement(navigationIcon) &&
                  navigationIcon
                }
              </View>
              <Text
                style={[styles.title, {color: theme.onPrimary}]}>
                { title }
              </Text>
              <View style={styles.actionItems}>
                {
                  React.isValidElement(actionItems) &&
                  actionItems
                }
              </View>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={[styles.scrollViewContainer, {backgroundColor: theme.background}]}
          >
            <WrappedComponent {...this.props} actionBar={actionBarProps}/>
          </ScrollView>
        </View>
      )
    }
  }
  return withTheme(ActionBarHoc)
}

export default withActionBar

const styles = StyleSheet.create({
  actionBarContainer: {
    height: 56,
    padding: 16,
    elevation: 4,
    shadowColor: 'black',
    shadowRadius: 10
  },
  actionBarContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  navigationIcon: {
    marginRight: 32
  },
  title: {
    fontSize: 20,
    fontFamily: 'Lekton-Bold'
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionItems: {
    marginLeft: 'auto'
  }
})