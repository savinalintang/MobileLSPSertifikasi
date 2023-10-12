import React, { useEffect, useReducer, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "./components/utils/TabBarIcon";
import TabBarText from "./components/utils/TabBarText";
// import AppNavigator from "./navigation/AppNavigator";
import Login from "./screens/Login";
import Home from "./screens/Home";
import SecondScreen from "./screens/SecondScreen";
import Pengeluaran from "./screens/Pengeluaran";
import Pemasukan from "./screens/Pemasukan";
import Detail from "./screens/Detail";
import Profile from "./screens/Profile";
// import Signup from "./Signup";
// import Home from "./Home";
// import Note from "./Note";
// import Create from "./Create";
// import Detail from "./Detail";

const Stack = createNativeStackNavigator();
const Main = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="loginPage" component={Login} />
    </Stack.Navigator>
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
            <TabBarText focused={focused} title="Beranda" />
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
            <TabBarIcon focused={focused} icon={"cash"} />
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
            <TabBarIcon focused={focused} icon={"remove-circle-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Detail"
        component={Detail}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Detail" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"information-circle"} />
          ),
        }}
      />

       <Tabs.Screen
        name="Profil"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Pengaturan" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"settings-outline"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const Route = (props) => {
  const [isLoading, setIsLoading] = useState(false);

	return (
	  <>
	    <NavigationContainer>
	        <Stack.Navigator>
	        <Stack.Screen
            name="Login"
            options={{
              title: "Login",
            }}
          >
            {(props) => (
              <Login
                {...props}
              />
            )}
          </Stack.Screen>
	       <Stack.Screen
            name="Home"
            options={{
              title: "Main",
              headerBackVisible: false
            }}
          >
            {(props) => (
              <Main
                {...props}
              />
            )}
          </Stack.Screen>

	        </Stack.Navigator>
	    </NavigationContainer>
	  </>
	);
};

export default Route;