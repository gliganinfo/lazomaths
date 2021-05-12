
import React from 'react'
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Vibration
} from 'react-native'

import { setCustomText } from 'react-native-global-props'
import { 
  useFonts,
  IBMPlexMono_400Regular as Mono400,
  IBMPlexMono_400Regular_Italic as Mono400Italic,
  IBMPlexMono_500Medium as Mono500,
  IBMPlexMono_500Medium_Italic as Mono500Italic,
  IBMPlexMono_600SemiBold as Mono600,
  IBMPlexMono_600SemiBold_Italic as Mono600Italic,
  IBMPlexMono_700Bold as Mono700,
  IBMPlexMono_700Bold_Italic as Mono700Italic 
} from '@expo-google-fonts/ibm-plex-mono'

// Set default font to IBM Plex Mono
setCustomText({ 
  style: { 
    fontFamily: 'Mono400'
  }
})

export default function CalcBtn(props) {
  const [fontsLoaded] = useFonts({
    Mono400,
    Mono600Italic,
    Mono700
  })

  const buttonWidth = (Dimensions.get("window").width / 4) - 5

  const bg = props.bg || '#E2DDB1'
  const color = props.color || '#000000'
  const flexType = parseInt(props.flexType) * buttonWidth || buttonWidth
  const charSize = parseInt(props.charSize) || 15
  
  return (
    <View style={{
      padding: 8
    }}>
      <TouchableOpacity
        onPress={() => {
          Vibration.vibrate(50)
          props.onPress()
        }}
        activeOpacity={.3}
        style={{
          fontFamily: 'Mono700',
          backgroundColor: bg,
          paddingVertical: 18,
          borderRadius: 5,
          width: flexType - 16,
          height: 55,
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center'
        }}>
        <Text style={{
          textAlign: 'center',
          fontSize: charSize,
          color: color
          }}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}