import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

export default function DisableKeyBoardHoc({children}) {
  return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {children}
   </TouchableWithoutFeedback>
  )
}