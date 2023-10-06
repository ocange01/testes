import React, { useEffect, useState } from 'react';
import '../css/pendaftaran.css' 
import { db } from '../firebase';
import aj from '../image/ft.png'
import bcgk from '../image/background pendaftaran online .png';
import { collection, getDocs, orderBy, query, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Box, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input } from '@chakra-ui/react';
import PrintPage from '../tampilan print/cetak';

const Admin = () => {
  const [dataPendaftaran, setDataPendaftaran] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [viewData, setViewData] = useState({});
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPrintPageOpen, setIsPrintPageOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null); 

  useEffect(() => {
    fetchDataPendaftaran();
  }, []);

  const fetchDataPendaftaran = async () => {
    try {
      const q = query(collection(db, 'datapendaftaran'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const pendaftaranData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataPendaftaran(pendaftaranData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'datapendaftaran', id));
      fetchDataPendaftaran();
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleEditInView = (data) => {
    setEditData({ ...data });
    setIsEditMode(true);
    setSelectedItemId(data.id);
    setIsViewModalOpen(true);
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setSelectedItemId(null); 
    setEditData({});
  };
  const handleUpdate = async () => {
    try {
      const { id, ...updatedData } = editData;
      await updateDoc(doc(db, 'datapendaftaran', id), updatedData);
      setIsEditMode(false);
      setSelectedItemId(null); 
      setEditData({});
      fetchDataPendaftaran();
      setIsViewModalOpen(false);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleView = async (id) => {
    try {
      const docRef = doc(db, 'datapendaftaran', id);
      const docSnap = await getDoc(docRef);
      setViewData({ id: docSnap.id, ...docSnap.data() });
      setIsViewModalOpen(true);
    } catch (error) {
      console.error('Error retrieving document: ', error);
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handlePrint = () => {
    setIsPrintPageOpen(true);
  };

  return (
    <section>
      <Box
      >
        <div className='p' style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
            <Table
              variant='simple'
              width='100%'
              backgroundColor='black'
              style={{
                marginTop: '20%',
              }}>
              <TableCaption >Tabel Registrasi Calgot</TableCaption>
              <Thead>
                <Tr color='white'>
                  <Th>No</Th>
                  <Th>Registrasi</Th>
                  <Th>Nama</Th>
                  <Th>Stambuk</Th>
                  <Th>Jurusan</Th>
                  <Th>Jenis Kelamin</Th>
                  <Th>Alamat</Th>
                  <Th>Riwayat organisasi</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataPendaftaran.map((data, index) => (
                  <Tr key={data.id}>
                    <Td>{index + 1}</Td>
                    <Td>{data.noRegistrasi}</Td>
                    <Td>{data.nama}</Td>
                    <Td>{data.stambuk}</Td>
                    <Td>{data.jurusan}</Td>
                    <Td>{data.jeniskelamin}</Td>
                    <Td>{data.alamat}</Td>
                    <Td>{data.riwayatOrganisasi}</Td>
                    <Td>
                      <Button
                        colorScheme='red'
                        size='sm'
                        onClick={() => handleDelete(data.id)}
                      >
                        Hapus
                      </Button>
                      <Button
                        colorScheme='teal'
                        size='sm'
                        onClick={() => handleView(data.id)}
                      >
                        Lihat
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      </Box>

      {isViewModalOpen && (
        <Modal isOpen={isViewModalOpen} onClose={closeViewModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader  backgroundImage={aj}
            color='black'
            opacity={0.9}>Detail Pendaftaran</ModalHeader>
            <ModalCloseButton />
            <ModalBody backgroundImage={aj}
            color='black'
            opacity={0.9}>
              <p>No Registrasi: {isEditMode ? <Input name="noRegistrasi" value={editData.noRegistrasi} onChange={handleEditInputChange} /> : viewData.noRegistrasi}</p>
              <p>Nama: {isEditMode ? <Input name="nama" value={editData.nama} onChange={handleEditInputChange} /> : viewData.nama}</p>
              <p>Stambuk: {isEditMode ? <Input name="stambuk" value={editData.stambuk} onChange={handleEditInputChange} /> : viewData.stambuk}</p>
              <p>Jurusan: {isEditMode ? <Input name="jurusan" value={editData.jurusan} onChange={handleEditInputChange} /> : viewData.jurusan}</p>
              <p>Tempat: {isEditMode ? <Input name="tempat" value={editData.tempat} onChange={handleEditInputChange} /> : viewData.tempat}</p>
              <p>Tanggal lahir: {isEditMode ? <Input name="tanggalLahir" value={editData.tl} onChange={handleEditInputChange} /> : viewData.tl}</p>
              <p>Jenis kelamin: {isEditMode ? <Input name="jenisKelamin" value={editData.jeniskelamin} onChange={handleEditInputChange} /> : viewData.jeniskelamin}</p>
              <p>Agama: {isEditMode ? <Input name="agama" value={editData.agama} onChange={handleEditInputChange} /> : viewData.agama}</p>
              <p>Alamat: {isEditMode ? <Input name="alamat" value={editData.alamat} onChange={handleEditInputChange} /> : viewData.alamat}</p>
              <p>No Hp: {isEditMode ? <Input name="noHp" value={editData.nohp} onChange={handleEditInputChange} /> : viewData.nohp}</p>
              <p>Riwayat Penyakit: {isEditMode ? <Input name="riwayatPenyakit" value={editData.riwayatPenyakit} onChange={handleEditInputChange} /> : viewData.riwayatPenyakit}</p>
              <p>Riwayat Organisasi: {isEditMode ? <Input name="riwayatOrganisasi" value={editData.riwayatOrganisasi} onChange={handleEditInputChange} /> : viewData.riwayatOrganisasi}</p>
              <p>Alasan masuk Tsc: {isEditMode ? <Input name="alasanMasukTsc" value={editData.alasan} onChange={handleEditInputChange} /> : viewData.alasan}</p>
            </ModalBody>
            <ModalFooter  backgroundImage={aj}
            color='black'
            opacity={0.9}>
              {isEditMode ? (
                <>
                  <Button colorScheme='green' size='sm' onClick={handleUpdate}>
                    Simpan
                  </Button>
                  <Button colorScheme='gray' size='sm' onClick={handleCancelEdit}>
                    Batal
                  </Button>
                </>
              ) : (
                <>
                  <Button colorScheme='teal' size='sm' onClick={handlePrint}>
                    Print
                  </Button>
                  <Button colorScheme='teal' size='sm' onClick={() => handleEditInView(viewData)}>
                    Edit
                  </Button>
                </>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={isPrintPageOpen} onClose={() => setIsPrintPageOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cetak Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PrintPage data={viewData} onClose={() => setIsPrintPageOpen(false)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' size='sm' onClick={() => setIsPrintPageOpen(false)}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default Admin;
