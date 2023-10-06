import React, { useEffect } from 'react';
import jsPDF from 'jspdf';

const PrintPage = ({ data }) => {
  useEffect(() => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.addFont("times");
    doc.setFont("times", "bold");
    doc.text('Formulir Pendaftaran Anggota', 105, 20, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    doc.text('Technic', 70, 30);
    doc.rect(10, 10, 190, 150);
    doc.setTextColor(255, 0, 0);
    doc.text('Study', 98, 30);
    doc.setTextColor(66, 153, 225);
    doc.text('Club', 119, 30);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    const viewData = data;
    
    doc.text(`No Registrasi: ${viewData.noRegistrasi}`, 20, 42);
    doc.text(`Nama: ${viewData.nama}`, 20, 50);
    doc.text(`Stambuk: ${viewData.stambuk}`, 20, 58);
    doc.text(`Jurusan: ${viewData.jurusan}`, 20, 66);
    doc.text(`TTL: ${viewData.tempat},${viewData.tl}`, 20, 74);
    doc.text(`Jenis Kelamin: ${viewData.jeniskelamin}`, 20, 82);
    doc.text(`Agama: ${viewData.agama}`, 20, 90);
    doc.text(`Alamat: ${viewData.alamat}`, 20, 98);
    doc.text(`NoHP/WA: +62${viewData.nohp}`, 20, 106);
    doc.text(`Riwayat Penyakit: ${viewData.riwayatPenyakit}`, 20, 114);
    doc.text(`Riwayat Organisasi: ${viewData.riwayatOrganisasi}`, 20, 122);
    doc.text(`Alasan Masuk TSC: ${viewData.alasan}`, 20, 130);
    doc.rect(160, 90, 30, 40);
    doc.text('foto 3X4', 175, 110, { align: 'center', verticalAlign: 'middle' });
    doc.save('datapendaftaran.pdf');
  }, []);
  

  return <div>Loading...</div>;
};

export default PrintPage;
