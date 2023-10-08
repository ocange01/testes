import React, { useState, useEffect } from 'react';
import {
  Box,
  Alert,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Select,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import bcgk from '../image/background pendaftaran online .png';
import '../css/pendaftaran.css';

const Pendaftaran = () => {
  const [nama, setNama] = useState('');
  const [stambuk, setStambuk] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [jeniskelamin, setJeniskelamin] = useState('');
  const [agama, setAgama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [nohp, setNohp] = useState('');
  const [tempat, setTempat] = useState('');
  const [tl, setTl] = useState('');
  const [riwayatPenyakit, setRiwayatPenyakit] = useState('');
  const [riwayatOrganisasi, setRiwayatOrganisasi] = useState('');
  const [alasan, setAlasan] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [registrationCounter, setRegistrationCounter] = useState(1);

  useEffect(() => {
    const fetchDocumentCount = async () => {
      const collectionRef = collection(db, 'datapendaftaran');
      const querySnapshot = await getDocs(collectionRef);
      const documentCount = querySnapshot.size;
      setRegistrationCounter(documentCount + 1);
    };

    fetchDocumentCount();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      nama &&
      stambuk &&
      jurusan &&
      jeniskelamin &&
      agama &&
      alamat &&
      nohp &&
      tempat &&
      tl &&
      riwayatPenyakit &&
      riwayatOrganisasi &&
      alasan
    ) {
      try {
        const dataPendaftaran = {
          nama,
          stambuk,
          jurusan,
          jeniskelamin,
          agama,
          alamat,
          nohp,
          tempat,
          tl,
          riwayatPenyakit,
          riwayatOrganisasi,
          alasan,
          noRegistrasi: `R-${registrationCounter.toString().padStart(4, '0')}`,
          timestamp: serverTimestamp(),
        };

        await addDoc(collection(db, 'datapendaftaran'), dataPendaftaran);
        setIsSubmitted(true);
        setTimeout(() => {
          window.location.href = '/Hasil';
        }, 2000);
      } catch (error) {
        console.error('Terjadi kesalahan saat menyimpan pendaftaran:', error);
        setIsError(true);
      }
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
    setTl('');
    setTempat('');
    setRiwayatPenyakit('');
    setRiwayatOrganisasi('');
    setAlasan('');
    setIsSubmitted(false);
    setIsError(false);
  };

  return (
    <Box
      className='main'
      // color='white'
      // bg='rgba(0, 0, 0, 1)'
      // isolation='isolate'
      // backgroundImage={bcgk}
      // backgroundSize='cover'
      // backgroundAttachment='fixed'
      // backgroundRepeat='no-repeat'
      // opacity={1}
    >
      <section position='relative'>
        <Box
          className='container'
          justifyContent='center'
          textAlign='center'
          display='flex'
          flexDirection='column'
          alignItems='center'
          padding='40px'
          borderRadius='20px'
        >
          <form onSubmit={handleSubmit}>
            <Box 
            marginTop='20%'
            >
            <FormControl isRequired marginBottom='4'>
              <FormLabel>Nama Lengkap</FormLabel>
              <Input type='text' value={nama} onChange={(e) => setNama(e.target.value)} />
            </FormControl>
            <FormControl isRequired marginBottom='4'>
              <FormLabel>Stambuk</FormLabel>
              <Input type='text' value={stambuk} onChange={(e) => setStambuk(e.target.value)} />
            </FormControl>
            <FormControl isRequired marginBottom='4'>
              <FormLabel>Jurusan</FormLabel>
              <Select
                className='b3'
                color='lightgrey'
                backgroundColor='transparant'
                placeholder='Pilih jurusan'
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
              >
                <option value='Teknik Informatika'>Teknik informatika</option>
                <option value='Sistem Informasi'>Sistem informasi</option>
                <option value='Rekayasa Perangkat Lunak'>Rekayasa Perangkat lunak</option>
                <option value='Manajemen Informatika'>Manajemen Informatika</option>
                <option value='Bisnis Digital'>Bisnis Digital</option>
                <option value='Kewirausahaan'>Kewirausahaan</option>
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
                  color='white'
                  style={{
                    border: '1px solid white',
                    backgroundColor: 'transparent',
                    color: 'white',
                  }}
                  required
                  value={tl}
                  onChange={(e) => setTl(e.target.value)}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired marginBottom='4'>
              <FormLabel>Jenis Kelamin</FormLabel>
              <RadioGroup value={jeniskelamin} onChange={setJeniskelamin}>
                <Stack spacing={4} direction='row'>
                  <Radio value='Laki-laki'>Laki-laki</Radio>
                  <Radio value='Perempuan'>Perempuan</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired marginBottom='4'>
              <FormLabel>Agama</FormLabel>
              <Select
                className='b4'
                placeholder='Pilih agama'
                color={'white'}
                backgroundColor={'transparent'}
                value={agama}
                onChange={(e) => setAgama(e.target.value)}
              >
                <option value='Islam'>Islam</option>
                <option value='Kristen'>Kristen</option>
                <option value='Katolik'>Katolik</option>
                <option value='Hindu'>Hindu</option>
                <option value='Buddha'>Buddha</option>
                <option value='Konghucu'>Konghucu</option>
              </Select>
            </FormControl>
            <FormControl isRequired marginBottom='4'>
              <FormLabel>Alamat</FormLabel>
              <Input type='text' value={alamat} onChange={(e) => setAlamat(e.target.value)} />
            </FormControl>
            <FormControl isRequired marginBottom='4'>
              <FormLabel>Nomor HP</FormLabel>
              <Stack spacing={2}>
                <InputGroup>
                  <InputLeftAddon children='+62' color='white' background='black' className='i' />
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
            <FormControl isRequired marginBottom='4'>
              <FormLabel>Riwayat Penyakit</FormLabel>
              <Input type='text' value={riwayatPenyakit} onChange={(e) => setRiwayatPenyakit(e.target.value)} />
            </FormControl>
            <FormControl isRequired marginBottom='4'>
              <FormLabel>Riwayat Organisasi</FormLabel>
              <Input type='text' value={riwayatOrganisasi} onChange={(e) => setRiwayatOrganisasi(e.target.value)} />
            </FormControl>
            <FormControl isRequired marginBottom='4'>
              <FormLabel>Alasan Masuk TSC</FormLabel>
              <Input type='text' value={alasan} onChange={(e) => setAlasan(e.target.value)} />
            </FormControl>
            <Button type='submit' colorScheme='blue' marginTop='4' >
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
                Pendaftaran berhasil! Mohon tunggu sebentar.
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
                Terjadi kesalahan saat menyimpan data pendaftaran.
              </Alert>
            )}
            <Button colorScheme='red' variant='outline' mt={4} onClick={handleReset}>
              Reset
            </Button>
            </Box>
          </form>
        </Box>
      </section>
    </Box>
  );
};

export default Pendaftaran;
