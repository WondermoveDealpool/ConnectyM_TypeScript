import React from 'react';
import styled from 'styled-components/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Alert, TouchableOpacity} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//screens
import {
  homeViewDataTest,
  SecondCatView,
  ThirdCatView,
  searchView,
  mymusicView,
  boardView,
  profileView,
  PlayerBar,
} from '../screens';

const PlayerContainer = styled.View`
  /* width: 100%;
  position: absolute;
  bottom: 79px;
  flex-direction: row;
  justify-content: center;
  background-color: red;
  height: 50; */
`;

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
const HomeTopTab = createMaterialTopTabNavigator();

const HomeTabNavigation = () => {
  return (
    <HomeTopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 40,
        },
        tabBarIndicatorStyle: {
          borderBottomWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          margin: -10,
        },
      }}>
      <HomeTopTab.Screen name="팔로잉" component={homeViewDataTest} />
      <HomeTopTab.Screen name="인기아티스트" component={SecondCatView} />
      <HomeTopTab.Screen name="게시판" component={ThirdCatView} />
    </HomeTopTab.Navigator>
  );
};

const MainTab = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'ios-search-outline';
            } else if (route.name === 'MyMusician') {
              iconName = focused
                ? 'ios-musical-notes'
                : 'ios-musical-notes-outline';
            } else if (route.name === 'Board') {
              iconName = focused ? 'clipboard' : 'clipboard-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <IonIcon name={iconName} size={size} color={color} />;
          },
          headerTitleAlign: 'center',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeTabNavigation}
          options={{
            headerRight: () => {
              return (
                <TouchableOpacity onPress={() => Alert.alert('Test')}>
                  <IonIcon
                    name="add"
                    size={24}
                    color="black"
                    style={{marginRight: 8}}
                  />
                </TouchableOpacity>
              );
            },
          }}
        />
        <Tab.Screen name="Search" component={searchView} />
        <Tab.Screen name="MyMusician" component={mymusicView} />
        <Tab.Screen name="Board" component={boardView} />
        <Tab.Screen name="Profile" component={profileView} />
      </Tab.Navigator>
      <PlayerContainer>
        <PlayerBar />
      </PlayerContainer>
    </>
  );
};

export default MainTab;
