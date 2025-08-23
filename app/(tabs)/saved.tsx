import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants/icons'
import MovieCard from '@/components/MovieCard'
import { useMovies } from '@/contexts/SavedMovieContext'
import { fetchMoviesDetails } from '@/services/api'
import { useFocusEffect } from '@react-navigation/native';

const Saved = () => {

  const [savedMovies, setSavedMovies] = useState<MovieDetails[]>([]);

  const saveMovies = useMovies();
  const getMovies = async () => {
    const data = await saveMovies.getSavedMovies();
    if (data) {
      for (const item of data) {
        const itemdata = await fetchMoviesDetails(item.movieId);
        setSavedMovies(prev => [...prev, itemdata]);
      }
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      setSavedMovies([])
      getMovies();
    }, [])
  );




  return (
    <View className='bg-primary flex-1 px-6'>
      <Text className='text-4xl text-white mt-[25%]'>Saved Movies</Text>
      <FlatList
        data={savedMovies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => `${item.id}_${item.title}`}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="mt-10 pb-32"
      />
    </View>
  )
}

export default Saved