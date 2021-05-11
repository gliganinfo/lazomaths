
import React from 'react'
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Vibration
} from 'react-native'

export default function CalcBtn(props) {

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