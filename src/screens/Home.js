import React, { useEffect, useState } from "react";
import { View, Linking, StyleSheet } from "react-native";
import { Image } from 'expo-image';
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";
import * as SQLite from 'expo-sqlite';
import Moment from 'moment';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
const db = SQLite.openDatabase('db.testDb'); // returns Database object


export default function ({ navigation }) {
  const [masuk, setMasuk] = useState('');
  const [keluar, setKeluar] = useState('');
  const [saldo, setSaldo] = useState('');
  Moment.locale('id');
  var dt = new Date();
  var bulan = Moment(dt).format('M');
  var ini = Moment(dt).format('MMMM');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Membuat tabel jika belum ada
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,tanggal TEXT,nominal TEXT,tipe TEXT,bulan TEXT)'
      );
    });


    // Mengambil data dari database saat aplikasi dimuat
    fetchMasuk();
    fetchKeluar();
    saldoGet();
  }, []);

  const fetchMasuk = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT sum(nominal) as nominal FROM items WHERE tipe = "masuk" AND bulan = ?', [bulan], (_, { rows }) => {
        const len = rows.item(0).nominal;
         console.log(`Data masuk: ${len}`);
         setMasuk(len);
      });
    });
  };

   const fetchKeluar = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT sum(nominal) as nominal FROM items WHERE tipe = "keluar" AND  bulan = ?', [bulan], (_, { rows }) => {
        const len = rows.item(0).nominal;
         console.log(`Data keluar: ${len}`);
         setKeluar(len);
      });
    });
  };

  const saldoGet = () => {
    fetchMasuk();
    fetchKeluar();
    let oke = masuk - keluar;
    console.log(oke); 
    setSaldo(oke);
  };

  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
    <View style={styles.container}>
      <Image
        style={styles.image}
        source="https://img2.pngdownload.id/20180509/grw/kisspng-free-cash-flow-finance-corporate-bond-corporation-5af3c08d49b0b3.7221204615259239813018.jpg"
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
    </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
      

        <Section>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
             Rangkuman Bulan Ini {ini}
            </Text>

             <Text style={{ textAlign: "center",color: "green" }}>
                Pemasukan : Rp. {parseInt(masuk).toLocaleString()}
             </Text>

             <Text style={{ textAlign: "center",color: "red" }}>
                Pengeluaran : Rp. {parseInt(keluar).toLocaleString()}
             </Text>

              <Text style={{ textAlign: "center",color: "orange" }}>
                Saldo : Rp. {parseInt(saldo).toLocaleString()}
             </Text>

             <Button style={{ 
                marginTop: 40,
                marginBottom: 10,
              }} status="primary" text="Update Saldo" onPress={saldoGet} />
        
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '80%',
    backgroundColor: '#0553',
  },
});
