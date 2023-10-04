/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, Ionicons, Entypo } from '@expo/vector-icons'
import Chat from './src/screens/Chat'
import Login from './src/screens/LogIn'
import SignUp from './src/screens/SignUp'
import Home from './src/screens/Home'
import Friends from './src/screens/Friends'
import AddFriends from './src/screens/AddFriends'
import HeaderLogoutButton from './src/components/HeaderLogoutButton'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 16
        },
        tabBarStyle: {
          height: 90,
          backgroundColor: '#EF475B'
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Chats',
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTintColor: 'white',
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="message"
              size={40}
              color={focused ? 'white' : 'black'}
            />
          )
        }}
      />
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTintColor: 'white',
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-friends"
              size={30}
              color={focused ? 'white' : 'black'}
            />
          )
        }}
      />
      <Tab.Screen
        name="Add Friends"
        component={AddFriends}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerText,
          headerTintColor: 'white',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-add"
              size={30}
              color={focused ? 'white' : 'black'}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            headerShown: false,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerText,
            headerTintColor: 'white'
          }}
        />
        {/* <Stack.Screen
          name="LogIn"
          component={Login}
          options={{
            title: 'Log In',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerText,
            headerTintColor: 'white'
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Sign Up',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerText,
            headerTintColor: 'white'
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            title: 'Chat',
            headerStyle: styles.header,
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => <HeaderLogoutButton />,
            headerTitleStyle: styles.headerText,
            headerTintColor: 'white'
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#EF475B',
    height: 100
  },
  headerText: {
    color: 'white',
    fontSize: 20
  }
})

export default App
