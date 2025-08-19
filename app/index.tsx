import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    console.log('Component mounted')

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        )
        const data: Post[] = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()

    return () => {
      console.log('Component unmounted')
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  post: { marginBottom: 15 },
  title: { fontSize: 16, fontWeight: '600' },
})

export default App
