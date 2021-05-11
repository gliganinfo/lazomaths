
import React from 'react'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  mainContainer: {
    padding: 10,
    paddingTop: 0,
    flex: 1,
    backgroundColor: '#F2EECB',
    display: 'flex',
    flexDirection: 'column'
  },
  calcScreen: {
    flex: 1,
    display: 'flex'
  },
  buttonKeyboard: {
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  calcResult: {
    color: '#000',
    fontFamily: 'Mono700',
    fontSize: 45,
    textAlign: 'right',
    marginTop: 20,
    lineHeight: 50
  },
  calcResultHistory: {
    color: '#797766',
    fontFamily: 'Mono700',
    fontSize: 30,
    textAlign: 'right',
    marginBottom: 10,
    lineHeight: 35
  },
  calcHistory: {
    borderBottomColor: '#ADA986',
    borderBottomWidth: 1,
    margin: 8,
    marginTop: 0
  },
  clearHistoryText: {
    fontFamily: 'Mono600Italic',
    textDecorationLine: 'underline',
    color: '#888',
    textAlign: 'right',
    fontSize: 15,
    paddingVertical: 10,
    marginBottom: 10
  }
})