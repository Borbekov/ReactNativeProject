import React from "react";
import { Platform } from "react-native";
import TabBarIcon from "../src/components/TabBarIcon";
import HomeScreen from "../src/screens/HomeScreen";
import LinksScreen from "../src/screens/LinksScreen";
import SettingsScreen from "../src/screens/SettingsScreen";
import UserPageScreen from "../src/screens/UserPageScreen";
import MapScreen from "../src/screens/MapScreen";
import PlaceFullScreen from "../src/screens/PlaceFullScreen";
import FriendsListScreen from "../src/screens/FriendsListScreen";
import SearchFriendsScreen from "../src/screens/SearchFriendsScreen";
import FollowersScreen from "../src/screens/FollowersScreen";
import FollowsScreen from "../src/screens/FollowsScreen";
import CameraScreen from "../src/screens/CameraScreen";
import GalleryScreen from "../src/screens/GalleryScreen";
import PhotosScreen from "../src/screens/PhotosScreen";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  MapScreen: MapScreen,
  PlaceFullScreen: PlaceFullScreen,
  UserPageScreen: UserPageScreen,
  FollowersScreen: FollowersScreen,
  FollowsScreen: FollowsScreen
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: "News",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === "ios"
            ? `ios-information-circle${focused ? "" : "-outline"}`
            : "md-information-circle"
        }
      />
    ),
    tabBarVisible
  };
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
  PlaceFullScreen: PlaceFullScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "City Map",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  UserPageScreen: UserPageScreen,
  MapScreen: MapScreen,
  PlaceFullScreen: PlaceFullScreen,
  FriendsListScreen: FriendsListScreen,
  PhotosScreen: PhotosScreen,
  SearchFriendsScreen: SearchFriendsScreen,
  FollowersScreen: FollowersScreen,
  FollowsScreen: FollowsScreen,
  CameraScreen: CameraScreen,
  GalleryScreen: GalleryScreen
});

SettingsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: "Settings",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? "ios-options" : "md-options"}
      />
    ),
    tabBarVisible
  };
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
});
