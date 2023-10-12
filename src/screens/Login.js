import React, { useEffect, useState } from "react";
// import { FontAwesome,MaterialIcons,Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { 
        Text, Button, View, 
        Alert, ScrollView, TextInput,
        TouchableOpacity,Image } 
  from "react-native";
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.testDb'); // returns Database object

const Login = (props) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  var masterUsername = 'savina';
  var masterPassword = 'savina';
  useEffect(() => {
    const initiate = async () => {};
    initiate();

      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,password TEXT)'
        );
      });

      //buat user
      db.transaction((tx) => {
        tx.executeSql('INSERT INTO users (name,password) VALUES (?,?)', 
          [masterUsername,masterPassword], (_, { insertId }) => {
          console.log(`Data berhasil ditambahkan dengan ID: ${insertId}`);
        });
      });

      //cek user
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
          const data = [];
          const len = rows.item(0).name;
          console.log(len);
        });
      });

  }, []);

  //api handle
  const login = async () => {
    if(username == "")
    {
      alert('isi username');
    }else
    {
       if(password == "")
       {
         alert('isi password');
       }else
       {
           db.transaction((tx) => {
            tx.executeSql('SELECT * FROM users', [], (_, { rows }) => {
                const usernameDb = rows.item(0).name;
                const usernamePw = rows.item(0).password;
                if(username == usernameDb)
                {
                   if(password == usernamePw)
                   {
                      alert('Selamat datang');
                      props.navigation.navigate("Home");
                       
                   }else
                   {
                      alert('salah password');
                   }
                }else
                {
                  alert('salah username');
                }
                console.log(usernamePw);
              });
          });
       }
    }
  };

  return (
    <View style={{
      flexGrow: 1,
      justifyContent:'center',
      backgroundColor:'#E9967A',
      alignItems: 'center'
    }}>
      <Text style={{
      marginBottom: 10,
      color:'#ffffff',
      textAlign:'center'
    }}>
        Selamat datang di BKN
      </Text>

      <FontAwesome style={{
         marginTop: 10,
         borderRadius: 10,
         borderWidth: 1,
         borderColor: '#fff'
      }} name="book" size={50} color="white" />

      <TextInput 
        style={{
            width:340,
            backgroundColor:'rgba(255, 255,255,0.2)',
            borderRadius: 25,
            paddingHorizontal:16,
            fontSize:16,
            color:'#ffffff',
            marginVertical: 10
        }}
        placeholder="Masukkan Username Yang Benar"
        underlineColorAndroid='rgba(0,0,0,0)'
        onChangeText={setUsername}
        value={username}
      />

      <TextInput
        style={{
          width:340,
          backgroundColor:'rgba(255, 255,255,0.2)',
          borderRadius: 25,
          paddingHorizontal:16,
          fontSize:16,
          color:'#ffffff',
          marginVertical: 10
      }}
        placeholder="Masukkan Password Yang Benar"
        onChangeText={setPassword}
        secureTextEntry={true}
        underlineColorAndroid='rgba(0,0,0,0)'
        value={password}
      />
      
      <TouchableOpacity onPress={() =>login()}
        style={{
          width:300,
          backgroundColor:'#6e706f',
          borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13
        }}
      >
        <Text style={{
          fontSize:16,
          fontWeight:'500',
          color:'#ffffff',
          textAlign:'center'
        }}>
          <FontAwesome name="sign-in" size={24} color="white" />
           
           </Text>
        </TouchableOpacity>

    </View>
  );
};
export default Login;
//