import { icons } from '@/constants/icons'
import { useMovies } from '@/contexts/SavedMovieContext'
import { useUser } from '@/contexts/UserContext'
import { fetchMoviesDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'


interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>
      {label}
    </Text>
    <Text className='text-light-200 font-bold text-sm mt-2'>
      {value || 'N/A'}
    </Text>
  </View>
)


const MovieDetails = () => {

  const user = useUser();
  const savedMovies = useMovies();
  const [savedMoviedId,setSavedMoviedId] = useState('')

  const [saveButtonDisabled,setSaveButtonDisabled] = useState(false)

  const [saved, setSaved] = useState(false);




  const { id } = useLocalSearchParams()


  const isSaved = async () => {
    const movie_exists = await savedMovies.getSavedMovieFromId(id as string)
    if (movie_exists && movie_exists?.length > 0) {
      setSaved(true);
      setSavedMoviedId(movie_exists[0].$id)
    }else{
      setSaved(false)
    }
  }

  useEffect(() => {
    isSaved()
  }, [])

  const saveMovie = async () => {
    setSaveButtonDisabled(true);
    if (!saved) {
      if (!id) {
        console.log("No Movie Exists")
        throw new Error("No movie exists");
      }
      if (user && user.current?.$id) {
        const data = {
          userId: user.current?.$id,
          movieId: id as string
        }

        await savedMovies.add(data)
        isSaved();
      } else {
        console.log("No user ID available")
      }
    } else {
      try {
        await savedMovies.remove(savedMoviedId)
        await isSaved();
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    setSaveButtonDisabled(false);
  }



  const { data: movie, loading } = useFetch(() => fetchMoviesDetails(id as string))

  return (
    loading ? <ActivityIndicator /> :
      <View className='bg-primary flex-1'>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }} >
          <View>
            <Image source={{ uri: `http://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className='w-full h-[550px]' resizeMode='stretch' />
          </View>

          <View className='flex-col items-start justify-center mt-5 px-5'>
            <View className='flex-row justify-between w-full'>
              <Text className='text-white font-bold text-xl w-[90%]'>
                {movie?.title}
              </Text>
              {
                user?.current && (
                  <TouchableOpacity onPress={() => saveMovie()} disabled={saveButtonDisabled}>
                    {saved ? <Image source={icons.bookmarksolid} className='size-6' /> : <Image source={icons.bookmarktransparent} className='size-7' />}
                  </TouchableOpacity>
                )
              }

            </View>
            <View className='flex-row items-center gap-x-1 mt-2'>
              <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
              <Text className='text-light-200 text-sm'>
                {movie?.runtime}m
              </Text>
            </View>
            <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
              <Image source={icons.star} className='size-4' />
              <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0)}/10</Text>
              <Text className='text-light-200 text-sm '>
                ({movie?.vote_count} votes)
              </Text>

            </View>
            <MovieInfo label='Overview' value={movie?.overview} />
            <MovieInfo label='Genres' value={movie?.genres?.map((g) => g.name).join('-') || 'N/A'} />
            <View className='flex flex-row justify-between w-1/2'>
              <MovieInfo label='Budget' value={`$${(movie?.budget ?? 0) / 1_000_000} million`} />
              <MovieInfo label='Revenue' value={`$${Math.round((movie?.revenue ?? 0) / 1_000_000)} million`} />
            </View>
            <MovieInfo label='Production Companies' value={movie?.production_companies.map((c) => c.name).join('-') || 'N/A'} />
          </View>
        </ScrollView>
        <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50' onPress={router.back}>
          <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff" />
          <Text className='text-white font-semibold text-base'> Go Back</Text>
        </TouchableOpacity>
      </View>
  )
}

export default MovieDetails