import React, { useState } from 'react';
import { Box, Alert,Textarea, AlertIcon, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Button, Select, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import './pendaftaran.css';
import { db } from './firebase';
import { addDoc, collection,serverTimestamp } from 'firebase/firestore';
import bacg from './image/background pendaftaran online .png'

const Registration = () => {
  const [nama, setNama] = useState('');
  const [stambuk, setStambuk] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [jeniskelamin, setJeniskelamin] = useState('');
  const [agama, setAgama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [nohp, setNohp] = useState('');
  const [rp, setRp] = useState('');
  const [riwayat, setRiwayat] = useState('');
  const [alasan, setAlasan] = useState('');
  const [tempat, setTempat] = useState('');
  const [tl, setTl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nama ,
      stambuk,
      jurusan, 
      jeniskelamin, 
      agama ,
      alamat ,
      nohp ,
      tempat, 
      tl ,
      rp,
      riwayat, 
      alasan
    ) {
      try {
        await addDoc(collection(db, 'datapendaftaran'), {
          nama,
          stambuk,
          jurusan,
          jeniskelamin,
          agama,
          alamat,
          nohp,
          tempat,
          tl,
          rp,
          riwayat,
          alasan,
          timestamp: serverTimestamp() 
        });
        setIsSubmitted(true);
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      } catch (error) {
        console.error('Error saving registration:', error);
        setIsError(true);
      }
    }
  };
  const handleStambukChange = (e) => {
    const input = e.target.value;
    const regex = /^\d{0,6}$/;

    if (regex.test(input)) {
      setStambuk(input);
    }
  };
  const handleReset = () => {
    setNama('');
    setStambuk('');
    setJurusan('');
    setJeniskelamin('');
    setAgama('');
    setAlamat('');
    setNohp('');
    setRiwayat('');
    setAlasan('');
    setTempat('');
    setTl('');
    setIsSubmitted(false);
    setIsError(false);
  };

  return (

      <Box backgroundImage={bacg} className='main'>
      <div className='container'>
        <div className='img'>
          <div className='imgcon'>
            <div className='profile'></div>
          </div>
        </div>
        <Box width='auto' margin='auto'>
          <div className='tul'>Form Pendaftaran Calon Anggota</div>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired id='Nama' marginBottom='2'>
              <FormLabel>Nama Lengkap</FormLabel>
              <Input
                className='b1'
                type='text'
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired id='Stambuk' marginBottom='4'>
              <FormLabel>Stambuk</FormLabel>
              <Input
                className='b2'
                type='text'
                value={stambuk}
                onChange={handleStambukChange}              />
            </FormControl>
            <FormControl isRequired id='Jurusan' marginBottom='4'>
              <FormLabel>Jurusan</FormLabel>
              <Select
                className='b3'
                placeholder='Pilih jurusan'
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
              >
                <option value='Teknik informatika'>Teknik informatika</option>
                <option value='Sistem informasi'>Sistem informasi</option>
                <option value='Rekayasa perangkat lunak'>Rekayasa Perangkat lunak</option>
                <option value='Manajemen'>Manajemen</option>
              </Select>
            </FormControl>
            <FormControl isRequired id='ttl' marginBottom='4'>
              <FormLabel>Tempat tanggal lahir</FormLabel>
              <Stack spacing={4} direction='row'>
                <Input
                  className='ttl'
                  type='text'
                  value={tempat}
                  onChange={(e) => setTempat(e.target.value)}
                />
                <input
                  className='tg'
                  type='date'
                  required 
                  value={tl}
                  onChange={(e) => setTl(e.target.value)}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired id='jeniskelamin' marginBottom='4'>
              <FormLabel>Jenis kelamin</FormLabel>
              <RadioGroup value={jeniskelamin} onChange={setJeniskelamin}>
                <Stack spacing={4} direction='row'>
                  <Radio value='Laki-laki'>Laki-laki</Radio>
                  <Radio value='Perempuan'>Perempuan</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired id='Agama' marginBottom='4'>
              <FormLabel className='gama' >Agama</FormLabel>
              <Select
                className='b4'
                placeholder='Pilih agama'
                value={agama}
                onChange={(e) => setAgama(e.target.value)}
                
              >
                <option value='Islam'>Islam</option>
                <option value='Kristen'>Kristen</option>
                <option value='Katolik'>Katolik</option>
                <option value='Hindu'>Hindu</option>
                <option value='Buddha'>Buddha</option>
                <option value='Konghucu'>Konghucu</option>
                <option value='Lainnya'>Lainnya</option>
              </Select>
            </FormControl>
            <FormControl isRequired id='Alamat' marginBottom='4'>
              <FormLabel>Alamat</FormLabel>
              <Input
                className='b5'
                type='text'
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired id='Nohp' marginBottom='4'>
              <FormLabel>Nohp/WA</FormLabel>
              <Stack spacing={2}>
                <InputGroup>
                  <InputLeftAddon children='+62'
                  className='i' />
                  <Input
                    className='b6'
                    type='tel'
                    placeholder='Input nomor hp'
                    value={nohp}
                    
                    onChange={(e) => setNohp(e.target.value)}
                  />
                </InputGroup>
              </Stack>
            </FormControl>
            <FormControl id='rp' marginBottom='4'>
              <FormLabel>Riwayat Penyakit</FormLabel>
              <Input
                className='rp'
                type='text'
                value={rp}
                onChange={(e) => setRp(e.target.value)}
              />
            </FormControl>
            <FormControl id='Riwayat' marginBottom='4'>
              <FormLabel>Riwayat organisasi</FormLabel>
              <Input
                className='b7'
                type='text'
                value={riwayat}
                onChange={(e) => setRiwayat(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired id='Alasan' marginBottom='4'>
              <FormLabel>Alasan masuk TSC</FormLabel>
              <Textarea
                className='b8'
                value={alasan}
                type='text'
                size='sm'
                onChange={(e) => setAlasan(e.target.value)}
              />
            </FormControl>
            <Button className='btn' type='submit' colorScheme='blue' marginTop='4' width='40%'>
              Daftar
            </Button>
            {isSubmitted && (
              <Alert
                status='success'
                marginTop='4'
                position='fixed'
                top='50%'
                left='50%'
                transform='translate(-45%, -50%)'
                variant='solid'
                bg='green.500'
                color='white'
                maxW='md'
              >
                <AlertIcon />
                Pendaftaran berhasil! Mohon tunggu Sebentar.
                <Button
                  position='absolute'
                  top='0.5rem'
                  right='0.5rem'
                  variant='ghost'
                  onClick={() => setIsSubmitted(false)}
                >
                  X
                </Button>
              </Alert>
            )}
            {isError && (
              <Alert
                status='error'
                marginTop='4'
                position='fixed'
                top='50%'
                left='40%'
                transform='translate(-50%, -50%)'
              >
                <AlertIcon />
                Terjadi kesalahan saat menyimpan data pendaftaran.
              </Alert>
            )}   <Button
            colorScheme="red"
            variant="outline"
            mt={4}
            width='40%'
            onClick={handleReset}
          >
            Reset
          </Button>
          </form>
        </Box>
      </div>
      </Box>

    
  );
};

export default Registration;