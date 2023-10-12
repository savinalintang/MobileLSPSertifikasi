import React, { useEffect, useState } from 'react';
import 
{  
	  View,
	  TextInput,
	  FlatList,
	  SafeAreaView,
	  StyleSheet,
} from 'react-native';
import { Layout, Text,Button } from 'react-native-rapi-ui';
import Constants from 'expo-constants';

import * as SQLite from 'expo-sqlite';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

const db = SQLite.openDatabase('db.testDb'); // returns Database object

export default function ({ navigation }) {
  const [name, setName] = useState('');
  const [nominal, setNominal] = useState('');
  const [items, setItems] = useState([]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };



  useEffect(() => {
    // Membuat tabel jika belum ada
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,tanggal TEXT,nominal TEXT,tipe TEXT,bulan TEXT)'
      );
    });


    // Mengambil data dari database saat aplikasi dimuat
    fetchItems();
  }, []);

  const fetchItems = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM items', [], (_, { rows }) => {
        const data = [];
        const len = rows.length;
        for (let i = 0; i < len; i++) {
        	const formattedNumber = rows.item(i).nominal.toLocaleString('id-ID', {
			  style: 'currency',
			  currency: 'IDR',
			});
          data.push({ 
          	id: rows.item(i).id, 
          	name: rows.item(i).name, 
          	tanggal:rows.item(i).tanggal,
          	tipe:rows.item(i).tipe,
          	nominal:formattedNumber 
          });
        }
        setItems(data);
      });
    });
  };

function MyFlatList({ data }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        if (item.tipe === 'masuk') {
          // Render sesuatu jika kondisi adalah 'A'
          return (
            <View>
              <Text 
                style={{ 
                  marginTop: 20,
                }}>
                   ID: {item.id}</Text>
                  <Text>Tanggal: {item.tanggal}</Text>
                  <Text>Nominal: (+) Rp.{parseInt(item.nominal).toLocaleString()}</Text>
                  <Text>Keterangan: {item.name}</Text>
                  <Text>
                    <FontAwesome name="check" size={30} color="green" />
                  </Text>
            </View>
          );
        } else {
          // Render sesuatu jika kondisi bukan 'A'
          return (
            <View>
             <Text 
                style={{ 
                  marginTop: 20,
                }}>
                   ID: {item.id}</Text>
                  <Text>Tanggal: {item.tanggal}</Text>
                  <Text>Nominal: (-) Rp.{parseInt(item.nominal).toLocaleString()}</Text>
                  <Text>Keterangan: {item.name}</Text>
                  <Text>
                    <FontAwesome name="check" size={30} color="red" />
                  </Text>
            </View>
          );
        }
      }}
    />
  );
}

  return (
  	<Layout>
    <View 
    	style=
    	    {{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}>
      <Button style={{ 
        marginTop: 30,
        marginBottom: 10,
      }} status="primary" text="Update Data" onPress={fetchItems} />
      <Text style={{ 
		    paddingTop: 30,
		    marginBottom: 10,
		  }}>
      	Detail Cash Flow
      </Text>

      <MyFlatList data={items} />
    </View>
    </Layout>
  );
}

