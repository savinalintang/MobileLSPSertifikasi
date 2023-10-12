import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";

import Login from "../screens/Login";
import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";
import Pengeluaran from "../screens/Pengeluaran";
import Pemasukan from "../screens/Pemasukan";
import Detail from "../screens/Detail";

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
      <MainStack.Screen name="loginPage" component={Login} />
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Pemasukan"
        component={Pemasukan}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Pemasukan" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"arrow-forward"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Pengeluaran"
        component={Pengeluaran}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Pengeluaran" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"arrow-back"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Detail"
        component={Detail}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Detail Cash Flow" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"bar-chart"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
