import { images } from '@/constants/images';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Login from '@/app/login'

const Profile = () => {

  const user = useUser();
  const router = useRouter()

  const [isloggedIn,setIsloggedIn] = useState(false)

  useEffect(() => {
    if (!user?.current) {

      setIsloggedIn(false)
    }
    else{
      setIsloggedIn(true);
    }
  },[user])



  return (
    !isloggedIn ? (<Login />) : (
      <View>
        <View className='w-full h-[100%]'>
          <View className=" bg-primary ">
            <Image source={images.bg} className="absolute w-full z-0" />
            <View className='flex justify-center h-[100%] w-full items-center'>
              <TouchableOpacity onPress={() => user?.logout()} className='bg-gray-700 w-[80%] h-[50px] rounded-xl mt-8 justify-center items-center' >
                <Text className='text-white text-lg' >Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    )
  )
}

export default Profile