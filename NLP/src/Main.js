import { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, TextInput, View, Pressable } from 'react-native'

export const Main = () => {
  const [response, setResponsse] = useState('')
  const [question, setQuestion] = useState('')

  async function query(data) {
    const API_TOKEN = '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'

    const authData = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      method: 'POST',
      body: {
        data: JSON.stringify(data),
        num_return_sequences: 30,
        set_seed: 100,
        max_length: 300,
      },
    }

    const modelURL = 'https://api-inference.huggingface.co/models/gpt2'
    const res = await fetch(modelURL, authData, 500)
    const result = await res.json()

    setResponsse(result[0].generated_text)
    // return result
  }

  const onGoPress = () => {
    question.length > 0 && query(question)
  }

  // useEffect(() => {
  //   try {
  //     query('Who are you? ')
  //   } catch (e) {
  //     console.log('e')
  //   }
  // }, [])

  return (
    <View
      style={{
        padding: '20%',
        flexDirection: 'colomn',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextInput
        onChangeText={setQuestion}
        value={question}
        placeholder="type your question here"
        keyboardType="text"
        style={{
          margin: '10%',
          marginBottom: '30%',
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          padding: '5%',
        }}
      />
      <Pressable
        onPress={onGoPress}
        style={{
          borderWidth: 1,
          backgroundColor: 'yellow',
          padding: '5%',
          borderRadius: '15%',
          marginBottom: '30%',
        }}
      >
        <Text>Go</Text>
      </Pressable>
      {response.length > 0 && <Text>{response}</Text>}
    </View>
  )
}

export default Main
