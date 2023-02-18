import { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, TextInput, View, Pressable } from 'react-native'

import { HuggingFace } from 'huggingface'

export const Main = () => {
  const [response, setResponsse] = useState('')
  const [question, setQuestion] = useState('')

  async function query(data) {
    const API_TOKEN = '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'

    const body = {
      inputs: data,
      parameters: {
        max_new_tokens: 250,
      },
    }

    const authData = {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      method: 'POST',
      body: JSON.stringify(body),
    }

    const modelURL = 'https://api-inference.huggingface.co/models/gpt2'
    const res = await fetch(modelURL, authData)
    const result = await res.json()
    console.log('result', result)
    setResponsse(result[0].generated_text.split('.').slice(0, 5).join('. ') + '.')
    // return result
  }

  const onGoPress = () => {
    question.length > 0 && query(question)
  }

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
      {console.log('response', response)}
      {response.length > 0 && <Text>{response}</Text>}
    </View>
  )
}

export default Main
