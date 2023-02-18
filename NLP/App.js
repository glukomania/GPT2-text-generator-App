import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import Main from './src/Main'

export default function App() {
  return (
    <View>
      {console.log('==== starting ====')}
      <StatusBar style="auto" />
      <Main />
    </View>
  )
}
