
import React from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

import { StatusBar } from 'expo-status-bar'
import AppLoading from 'expo-app-loading'
import Constants from 'expo-constants'

// Custom components and styles
import styles from './styles'
import CalcBtn from './components/CalcBtn'

// Media
import LazomathsLogo from './assets/lazomaths.png'

// Font imports
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

// Import the swisscalc library
import './lib/swisscalc.lib.format.js'
import './lib/swisscalc.lib.operator.js'
import './lib/swisscalc.lib.operatorCache.js'
import './lib/swisscalc.lib.shuntingYard.js'
import './lib/swisscalc.display.numericDisplay.js'
import './lib/swisscalc.display.memoryDisplay.js'
import './lib/swisscalc.calc.calculator.js'
// Create the OC (what enables to do operations) and the calculator interface
const oc = global.swisscalc.lib.operatorCache
const calc = new global.swisscalc.calc.calculator()



// Set default font to IBM Plex Mono
setCustomText({ 
  style: { 
    fontFamily: 'Mono400'
  }
})


export default function App() {
  const [calcDisplay, setCalcDisplay] = React.useState('0')
  const [calcMemory, setCalcMemory] = React.useState({
    ans: '0',
    preAns: '0'
  })

  // Listen to every display change
  // React.useEffect(() => {
  //   let mainDisplay = calc.getMainDisplay()
  //   // Detect errors
  //   if (!(parseInt(mainDisplay) == mainDisplay)) {
  //     setCalcDisplay("Error")
  //   } else {
      // setCalcDisplay(mainDisplay)
  //   }
  // }, [calcDisplay])

  // Calculator functions
  
  const onDigitPress = (digit) => {
    calc.addDigit(digit)
    setCalcDisplay(calc.getMainDisplay())
    // console.log(calc.memoryDisplay())
  }

  const onUnaryOperatorPress = (operator) => {
    calc.addUnaryOperator(operator)
    setCalcDisplay(calc.getMainDisplay())
  }

  const onBinaryOperatorPress = (operator) => {
    calc.addBinaryOperator(operator)
    setCalcDisplay(calc.getMainDisplay())
  }

  const onEqualsPress = () => {
    calc.equalsPressed()
    let mainDisplay = calc.getMainDisplay()
    setCalcDisplay(mainDisplay)
    // Set Ans and PreAns
    setCalcMemory({
      preAns: calcMemory.ans,
      ans: parseInt(mainDisplay) || 0
    })
  }

  const onClearPress = () => {
    calc.clear()
    setCalcDisplay(calc.getMainDisplay())
  }

  const onPlusMinusPress = () => {
    calc.negate()
    setCalcDisplay(calc.getMainDisplay())
  }

  const onBackspacePress = () => {
    calc.backspace()
    setCalcDisplay(calc.getMainDisplay())
  }

  // Load the fonts that will be used
  const [fontsLoaded] = useFonts({
    Mono400,
    Mono600Italic,
    Mono700
  })

  // Do not show anything until the fonts are loaded
  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#F2EECB',
    }}>
      {/* Set the status bar transparent */}
      <StatusBar style="auto" />

      {/* Navbar */}
      <View style={{
        paddingTop: Constants.statusBarHeight,
        height: Constants.statusBarHeight + 40,
        padding: 15,
        backgroundColor: '#E2DDB1',
        borderBottomColor: '#ADA986',
        borderBottomWidth: 1
      }}>
        <Image 
          style={{ aspectRatio: 99.61/15, marginTop: 10, flex: 1, width: 150 }}
          resizeMethod="scale"
          source={LazomathsLogo} />
      </View>

      <View style={styles.mainContainer}>
        

        <View style={styles.calcScreen}>

          <ScrollView style={styles.calcHistory}
            // ref={ref => {this.scrollView = ref}}
            // onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          >
            <View style={{ flex: 1 }}></View>
            {/* <TouchableOpacity>
              <Text style={styles.clearHistoryText}>ELIMINAR HISTORIAL</Text>
            </TouchableOpacity> */}

            {/* <View>
              <Text style={{ color: '#797766', textAlign: 'right', fontSize: 18 }}>(30+6)*5</Text>
              <Text style={styles.calcResultHistory}> = 2015</Text>
            </View>
            <View>
              <Text style={{ color: '#797766', textAlign: 'right', fontSize: 18 }}>√632</Text>
              <Text style={styles.calcResultHistory}> = 25,1396</Text>
            </View>
            <View>
              <Text style={{ color: '#797766', textAlign: 'right', fontSize: 18 }}>70+23</Text>
              <Text style={styles.calcResultHistory}> = 93</Text>
            </View>
            <View>
              <Text style={{ color: '#797766', textAlign: 'right', fontSize: 18 }}>(30+6)*5</Text>
              <Text style={styles.calcResultHistory}> = 180</Text>
            </View> */}

            <Text style={styles.calcResult}>{calcDisplay}</Text>
          </ScrollView>
        </View>

        <View style={styles.buttonKeyboard}>

          <View style={styles.buttonRow}>
            <CalcBtn text="(" bg="#E8E4BB" color="#97947C" onPress={() => onDigitPress('(')} />
            <CalcBtn text=")" bg="#E8E4BB" color="#97947C" onPress={() => onDigitPress(')')} />
            <CalcBtn text="±" bg="#E8E4BB" color="#97947C" onPress={() => onPlusMinusPress()} />
            <CalcBtn text="⌫" bg="#C2BEA2" color="#000" onPress={() => onBackspacePress()} />
          </View>

          <View style={styles.buttonRow}>
            <CalcBtn text="sen" bg="#E8E4BB" color="#97947C" onPress={() => onUnaryOperatorPress(oc.SineOperator)} />
            <CalcBtn text="cos" bg="#E8E4BB" color="#97947C" onPress={() => onUnaryOperatorPress(oc.CosineOperator)} />
            <CalcBtn text="tan" bg="#E8E4BB" color="#97947C" onPress={() => onUnaryOperatorPress(oc.TangentOperator)} />
            <CalcBtn text="log10" bg="#E8E4BB" color="#97947C" onPress={() => onUnaryOperatorPress(oc.LogBase10Operator)} />
          </View>

          <View style={styles.buttonRow}>
            <CalcBtn text="^" bg="#E8E4BB" color="#97947C" onPress={() => onBinaryOperatorPress(oc.ExponentialOperator)} />
            <CalcBtn text="%" bg="#E8E4BB" color="#97947C" onPress={() => onUnaryOperatorPress(oc.PercentOperator)} />
            <CalcBtn text="√" bg="#E8E4BB" color="#97947C" onPress={() => onUnaryOperatorPress(oc.SquareRootOperator)} />
            <CalcBtn text="π" bg="#E8E4BB" color="#97947C" onPress={() => onUnaryOperatorPress(oc.PiOperator)} />
          </View>

          <View style={styles.buttonRow}>
            <CalcBtn text="÷" bg="#E8E4BB" color="#97947C" onPress={() => onBinaryOperatorPress(oc.DivisionOperator)} />
            <CalcBtn text="×" bg="#E8E4BB" color="#97947C" onPress={() => onBinaryOperatorPress(oc.MultiplicationOperator)} />
            <CalcBtn text="−" bg="#E8E4BB" color="#97947C" onPress={() => onBinaryOperatorPress(oc.SubtractionOperator)} />
            <CalcBtn text="+" bg="#E8E4BB" color="#97947C" onPress={() => onBinaryOperatorPress(oc.AdditionOperator)} />
          </View>
          
          <View style={styles.buttonRow}>
            <CalcBtn text="7" onPress={() => onDigitPress('7')} />
            <CalcBtn text="8" onPress={() => onDigitPress('8')} />
            <CalcBtn text="9" onPress={() => onDigitPress('9')} />
            <CalcBtn text="CLR" bg="#C2BEA2" color="#000" onPress={() => onClearPress()} />
          </View>

          <View style={styles.buttonRow}>
            <CalcBtn text="4" onPress={() => onDigitPress('4')} />
            <CalcBtn text="5" onPress={() => onDigitPress('5')} />
            <CalcBtn text="6" onPress={() => onDigitPress('6')} />
            <CalcBtn text="PreAns" bg="#C2BEA2" color="#000" onPress={() => onDigitPress(calcMemory.preAns)} />
          </View>

          <View style={styles.buttonRow}>
            <CalcBtn text="1" onPress={() => onDigitPress('1')} />
            <CalcBtn text="2" onPress={() => onDigitPress('2')} />
            <CalcBtn text="3" onPress={() => onDigitPress('3')} />
            <CalcBtn text="Ans" bg="#C2BEA2" color="#000" onPress={() => onDigitPress(calcMemory.ans)} />
          </View>

          <View style={styles.buttonRow}>
            <CalcBtn text="0" flexType="2" onPress={() => onDigitPress('0') } />
            <CalcBtn text="." onPress={() => onDigitPress('.')} />
            <CalcBtn text="=" bg="#49473D" color="#fff" charSize="25" onPress={() => onEqualsPress()} />
          </View>
        
        </View>

      </View>
    </View>
  )
}