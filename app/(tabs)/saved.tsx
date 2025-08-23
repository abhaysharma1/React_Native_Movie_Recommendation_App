import MovieCard from '@/components/MovieCard'
import { images } from '@/constants/images'
import { useMovies } from '@/contexts/SavedMovieContext'
import { useUser } from '@/contexts/UserContext'
import { fetchMoviesDetails } from '@/services/api'
import { useFocusEffect } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'

const Saved = () => {

  const [savedMovies, setSavedMovies] = useState<MovieDetails[]>([]);
  const user = useUser()

  const saveMovies = useMovies();
  const getMovies = async () => {
    if (user?.current) {
      const data = await saveMovies.getSavedMovies();
      if (data) {
        for (const item of data) {
          const itemdata = await fetchMoviesDetails(item.movieId);
          setSavedMovies(prev => [...prev, itemdata]);
        }
      }
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      if (user?.current) {
        setSavedMovies([])
        getMovies();
      }
    }, [])
  );




  return (
    <View className='bg-primary flex-1 '>
      <Image source={images.bg} className="absolute w-full z-0" />
      {user?.current ?
        (<>
          <Text className='text-4xl text-white mt-[25%] px-6'>Saved Movies</Text>
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
            className="mt-10 pb-32 px-6"
          />
        </>) :
        (<View className='w-full h-[70%] justify-center items-center '>
          <Text className='text-3xl text-white'>Login to See Saved Movies</Text>
        </View>)
      }

    </View>
  )
}

export default Saved