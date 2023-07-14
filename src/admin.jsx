import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import jsPDF from 'jspdf';

const Admin = () => {
const [dataPendaftaran, setDataPendaftaran] = useState([]);

useEffect(() => {
fetchDataPendaftaran();
}, []);

const fetchDataPendaftaran = async () => {
const q = query(collection(db, 'datapendaftaran'), orderBy('timestamp', 'desc'));
const querySnapshot = await getDocs(q);
const pendaftaranData = querySnapshot.docs.map((doc) => ({
id: doc.id,
...doc.data(),
}));
setDataPendaftaran(pendaftaranData.slice(0, 1));
};

const handlePrint = () => {
window.print();
};

const handleDownloadPDF = () => {
const data = dataPendaftaran[0];

const doc = new jsPDF();
doc.setFontSize(22);
doc.addFont("times")
doc.setFont("times","bold",)
doc.text('Formulir Pendaftaran Anggota', 105, 20, { align: 'center',});
doc.setTextColor(0, 0, 0); 
doc.text('Technic', 70, 30, );
doc.rect(10, 10, 190, 160 );
doc.setTextColor(255, 0, 0); 
doc.text('Study',  98, 30, );
doc.setTextColor(66, 153, 225); 
doc.text('Club',  119, 30, );
doc.setTextColor(0, 0, 0);
doc.setFontSize(12); 
doc.setFont("times","normal");
doc.text(`Nama: ${data.nama}`, 20, 50);
doc.text(`Stambuk: ${data.stambuk}`, 20, 58);
doc.text(`Jurusan: ${data.jurusan}`, 20, 66);
doc.text(`Tempat: ${data.tempat}`, 20, 74);
doc.text(`Tanggal Lahir: ${data.tl}`, 20, 82);
doc.text(`Jenis Kelamin: ${data.jeniskelamin}`, 20, 90);
doc.text(`Agama: ${data.agama}`, 20, 98);
doc.text(`Alamat: ${data.alamat}`, 20, 106);
doc.text(`NoHP/WA: +62${data.nohp}`, 20, 114);
doc.text(`Riwayat Penyakit: ${data.rp}`, 20, 122);
doc.text(`Riwayat Organisasi: ${data.riwayat}`, 20, 130);
doc.text(`Alasan Masuk TSC: ${data.alasan}`, 20, 138);
doc.rect(160, 98, 30, 40 );
doc.text('foto 3X4', 175, 118, { align: 'center', verticalAlign: 'middle' });
doc.save('datapendaftaran.pdf');
};

return (
<Box p={4}>
{dataPendaftaran.length === 0 ? (
<Text>Tidak ada data pendaftaran yang tersedia.</Text>) : (
<Box>
  {dataPendaftaran.map((data) => (
  <Box 
    key={data.id}
    mb={4}
    border="1px"
    borderColor="gray.200"
    fontFamily='times'
    p={4}
    fontSize={['md', 'lg', 'xl', '2xl']} >
      <Box textAlign="center" marginBottom={10}>
        <Text fontWeight="bold" fontSize="3xl" mb={4}>
          Formulir Pendaftaran Anggota
        <br />
        <Text as="span" fontWeight="semibold" color="black">
        Technic
        </Text>{' '}
        <Text as="span" fontWeight="semibold" color="red">
        Study
        </Text>{' '}
        <Text as="span" fontWeight="semibold" color="blue.400">
        Club
        </Text>
        </Text>
    </Box>
            <Text>Nama: {data.nama}</Text>
            <Text>Stambuk: {data.stambuk}</Text>
            <Text>Jurusan: {data.jurusan}</Text>
            <Text>Tempat: {data.tempat}</Text>
            <Text>Tanggal Lahir: {data.tl}</Text>
            <Text>Jenis Kelamin: {data.jeniskelamin}</Text>
            <Text>Agama: {data.agama}</Text>
            <Text>Alamat: {data.alamat}</Text>
            <Text>NoHP/WA: +62{data.nohp}</Text>
            <Text>Riwayat Penyakit: {data.rp}</Text>
            <Text>Riwayat Organisasi: {data.riwayat}</Text>
            <Text>Alasan Masuk TSC: {data.alasan}</Text>
              <Flex flexDirection="column" alignItems="flex-end">
              <Box
                            border="1px"
                            borderColor="black"
                            width="120px"
                            height="160px"
                            mt={4}
                            marginRight="5%"
                            boxShadow="0 0 0 1px black"
                          >
              <Text textAlign="center" fontSize="12px" lineHeight="160px">
              foto 3X4
              </Text>
              </Box>
              </Flex>
              <Button
                  colorScheme="blue"
                  onClick={handlePrint}
                  media="print"
                  display={['none', 'none', 'none', 'block']}
                > 
                  Print
              </Button>
                <Button colorScheme="blue" onClick={handleDownloadPDF}>
                  Download PDF
                </Button>
                </Box>
              ))}
            </Box>
              )}
         </Box>
       );
    };
export default Admin;