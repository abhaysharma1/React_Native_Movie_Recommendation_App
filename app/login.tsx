import { images } from '@/constants/images';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';


const Login = () => {
  const user = useUser();

  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className=" bg-primary ">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className='justify-center h-[100%] mx-7 w-full '>
        <Text className='text-white text-4xl mb-4'>Login</Text>
        <View >
          <Text className='text-white text-2xl'>Username/E-mail</Text>
          <TextInput
            className="bg-gray-800 w-[90%] h-[50px] mt-2 rounded-xl px-4 placeholder:text-white border-7 border-gray-900 text-white"
            placeholder="Email"
            value={email}
            textContentType='emailAddress'
            onChangeText={setEmail}
          />
          <Text className='text-white text-2xl mt-6'>Password</Text>
          <TextInput
            className="bg-gray-800 w-[90%] h-[50px] mt-2 text-white placeholder:text-white rounded-xl px-4 border-3 border-gray-900 "
            placeholder="Password"
            value={password}
            textContentType='password'
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => user?.login(email, password)} className='bg-gray-700 w-[90%] h-[50px] rounded-xl mt-8 justify-center items-center' >
            <Text className='text-white text-lg' >Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => user?.register(email, password)} className='bg-blue-800 w-[90%] h-[50px] rounded-xl mt-4 justify-center items-center' >
            <Text className='text-white text-lg' >Register</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Login