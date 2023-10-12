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
import Moment from 'moment';

const db = SQLite.openDatabase('db.testDb'); // returns Database object

export default function ({ navigation }) {
  const [name, setName] = useState('');
  const [nominal, setNominal] = useState('');
  const [items, setItems] = useState([]);
  Moment.locale('id');
  var dt = new Date();
  var bulan = Moment(dt).format('M');
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
 //    db.transaction((tx) => {
	//   tx.executeSql('ALTER TABLE items ADD COLUMN tanggal TEXT');
	// });

	// db.transaction((tx) => {
	//   tx.executeSql('ALTER TABLE items ADD COLUMN tipe TEXT');
	// });

    // Mengambil data dari database saat aplikasi dimuat
    fetchItems();
  }, []);

  const fetchItems = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM items WHERE tipe ="keluar" ', [], (_, { rows }) => {
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

  const resetItem = () => {
    setName(''); // Mengosongkan input setelah menambahkan
    setNominal('');
    setDate(new Date());
  };

  const addItem = () => {
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO items (name,nominal,tanggal,tipe,bulan) VALUES (?,?,?,?,?)', 
      	[name,nominal,date.toLocaleString(),'keluar',bulan], (_, { insertId }) => {
        console.log(`Data berhasil ditambahkan dengan ID: ${insertId}`);
        fetchItems(); // Memuat ulang data setelah menambahkan
        setName(''); // Mengosongkan input setelah menambahkan
        setNominal('');
        setDate(new Date());
      });
    });
  };

  // const updateItem = (id, newName) => {
  //   db.transaction((tx) => {
  //     tx.executeSql('UPDATE items SET name = ? WHERE id = ?', [newName, id], () => {
  //       //console.log(`Data dengan ID ${id} berhasil diperbarui.`);
  //       fetchItems(); // Memuat ulang data setelah memperbarui
  //     });
  //   });
  // };

  const deleteItem = (id) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM items WHERE id = ?', [id], () => {
        //console.log(`Data dengan ID ${id} berhasil dihapus.`);
        fetchItems(); // Memuat ulang data setelah menghapus
      });
    });
  };

  return (
  	<Layout>
    <View 
    	style=
    	    {{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}>

      <Text style={{ 
		    paddingTop: 30,
		    marginBottom: 10,
		  }}>
      	Tambahkan Pengeluaran Anda
      </Text>

	<Button status="primary" onPress={showDatepicker} text="Show Date Picker" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      <TextInput
        placeholder="Masukkan Nominal Anda"
        value={nominal}
        onChangeText={(text) => setNominal(text)}
        numeric
          keyboardType={'numeric'}
        style={{
		    borderBottomWidth: 1, 
		    borderColor: 'gray', 
		    paddingTop: 10,
		    marginBottom: 10,
        width:330,
		  }}
      />

      <TextInput
        placeholder="Masukkan Keterangan Anda"
        value={name}
        onChangeText={(text) => setName(text)}
        style={{
		    borderBottomWidth: 1, 
		    borderColor: 'gray', 
		    paddingTop: 10,
		    marginBottom: 10,
        width:330,
		  }}
      />

      <Button status="primary" text="Reset" onPress={resetItem} />
      <Button style={{ 
			    marginTop: 20,
			  }} status="primary" text="Simpan" onPress={addItem} />

      <FlatList
      	style={{ 
			    marginTop: 20,
			  }}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={{ 
			    marginTop: 20,
			  }}>
			 ID: {item.id}</Text>
            <Text>Tanggal: {item.tanggal}</Text>
            <Text>Nominal: {item.nominal}</Text>
            <Text>Keterangan: {item.name}</Text>
           	<Text>tipe: {item.tipe}</Text>
            <Button
	            style={{ 
			    marginTop: 20,
			  }}
            status="danger" text="Hapus" onPress={() => deleteItem(item.id)} />
          </View>
        )}
      />
    </View>
    </Layout>
  );
}

