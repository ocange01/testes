import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button
} from "@chakra-ui/react";
import bcgk from '../image/background pendaftaran online .png';
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const navigate = useNavigate();
  const password1 = "test123";
  const password2 = "daf123"

  const handleLogin = () => {
    if (password === password1) {
      console.log("Login berhasil!");
      navigate('/admin');
    }else if(password === password2){
      console.log("Login berhasil!");
      navigate('/Registration');
    }else {
      console.log("Password salah.");
    }
  };

  return (
    <div>
      <Box
        backgroundImage={bcgk}
        backgroundSize="cover"
        justifyContent="center"
        backgroundPosition="top center"
        backgroundAttachment="fixed"
        position="absolute"
        backgroundRepeat="no-repeat"
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        color="white"
       
      >
        <Box
          width='300px'
          height='400px'
          margin='auto'
          p="4"
          borderRadius="md"
          backgroundColor="rgba(255, 255, 255, 0)"
        >
          <FormControl isRequired id='Nama' mb='2'>
            <FormLabel>username</FormLabel>
            <Input
              className='b1'
              type='text'
              value={username}
              onChange={(e) => Setusername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired id='pass' mb='2'>
            <FormLabel>password</FormLabel>
            <Input
              className='b1'
              type='password'
              value={password}
              onChange={(e) => Setpassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
        </Box>
      </Box>
    </div>
  );
}

export default Login;
