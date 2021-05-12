
import * as React from 'react'
import {
  View,
  ScrollView,
  Text
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

import styles from '../styles'
import CalcBtn from '../components/CalcBtn'



function HistoryCard({ result, datetime}) {
  const timeFromNow = moment(datetime).fromNow()

  return (
    <View>
      <Text style={{ color: '#797766', textAlign: 'right', fontSize: 16 }}>{timeFromNow}</Text>
      <Text style={styles.calcResultHistory}>{result}</Text>
    </View>
  )
}


export default function History() {
  const [historyList, setHistoryList] = React.useState([])

  // Get all keys and return all saved items in JSON
  const fetchAllAsyncStorageItems = async() => {
    let allData = []

    const keys = await AsyncStorage.getAllKeys()
    const items = await AsyncStorage.multiGet(keys)

    items.forEach(item => {
      let data = item[1]
      let jsonData = JSON.parse(data)
      allData.push(jsonData)
    })

    return allData
  }

  const removeHistory = () => {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => {
        setHistoryList([])
        alert("Historial eliminado")
      })
  }

  React.useEffect(() => {
    fetchAllAsyncStorageItems().then(data => {
      setHistoryList(data)
    })
  }, [])
  
  // TODO: Show list in chronological order

  return (
    <ScrollView style={[styles.mainContainer, { padding: 20, paddingTop: 20 }]}>

      {historyList.map(item => {
        return (
          <HistoryCard result={item.result} datetime={item.datetime} />
        )
      })}

      <CalcBtn text="Borrar historial" bg="#E8E4BB" color="#97947C" flexType="4" onPress={() => removeHistory()} />

    </ScrollView>
  )
}