'use client';

import {
  Container,
  Typography,
  Stack,
  Divider,
  Grid,
  Box,
  Button,
} from '@mui/material';
import { Fragment, useRef } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import PDFGenerator, { PDFGeneratorRef } from '@/features/gen/pdf';


type MetaItem = {
  label: string;
  value: string;
};

const metaData: MetaItem[] = [
  { label: "Terakhir diperbarui", value: "1 Januari 2026" },
  { label: "Document Version", value: "1.0" },
  { label: "Issued by", value: "Jasakode Legal & Compliance Department" },
];

function DocumentMeta() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content 1fr",
        rowGap: "8px",
        columnGap: "12px",
        fontSize: "14px",
        lineHeight: 1.2,
      }}
    >
      {metaData.map((item, index) => (
        <Fragment key={index}>
          <div
            style={{
              fontWeight: 500,
              color: "#555",
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </div>

          <div
            style={{
              color: "#111",
            }}
          >
            : {item.value}
          </div>
        </Fragment>
      ))}
    </div>
  );
};


export default function PrivacyPolicyPage() {
  const pdfGenRef = useRef<PDFGeneratorRef>(null);

  return (
    <Container maxWidth="lg" sx={{ bgcolor: 'background.default', py: 10 }}>
      <PDFGenerator 
        ref={pdfGenRef}
      />
      <Stack spacing={2}>
        {/* Header */}
        <Stack spacing={1}
          sx={{
            p: { xs: 3, md: 5 }
          }}
        >
          <Grid spacing={3} container>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography fontWeight={600} fontSize={"2rem"} sx={{ mb: 1 }}>
                🔒 Privacy Policy
              </Typography>
              <DocumentMeta />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <Button
                  startIcon={<PictureAsPdfOutlinedIcon />}
                  onClick={() => pdfGenRef.current?.show()}
                >
                  Get PDF
                </Button>
              </Box>
            </Grid>
          </Grid>
          <br />
          <Typography fontSize={"1rem"}>
            <strong>Privacy Policy</strong> menjelaskan bagaimana perusahaan mengumpulkan, menggunakan, melindungi, dan menyimpan data pribadi pengguna. Kami berkomitmen menjaga kerahasiaan informasi dengan menerapkan standar keamanan yang tinggi serta memberikan transparansi penuh mengenai hak pengguna atas data mereka, termasuk pengaturan cookies dan layanan pihak ketiga.
          </Typography>
          <br />
          <Box>
            <Typography fontWeight={600} fontSize={"1.4rem"} sx={{ mb: 1 }}>
              📥 Information We Collect
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }} fontSize={"1rem"}>
              Kami mengumpulkan informasi untuk menyediakan, mengelola, meningkatkan,
              dan mengamankan layanan kami. Data yang dikumpulkan dibatasi pada
              informasi yang relevan dan proporsional dengan tujuan layanan yang
              diberikan.
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  👤 1. Informasi yang Anda Berikan Secara Langsung
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={"1rem"}>
                  Informasi yang Anda berikan ketika mendaftar akun, mengisi formulir,
                  atau berkomunikasi dengan kami. Ini dapat mencakup nama lengkap,
                  alamat email, nomor telepon, nama perusahaan, kredensial akun
                  (disimpan dalam bentuk terenkripsi), serta isi pesan atau dokumen
                  yang Anda kirimkan melalui layanan kami.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🌐 2. Informasi yang Dikumpulkan Secara Otomatis
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={"1rem"}>
                  Ketika Anda mengakses layanan kami, sistem secara otomatis mencatat
                  informasi teknis seperti alamat IP, jenis perangkat, sistem operasi,
                  browser dan versinya, halaman yang diakses, waktu kunjungan,
                  durasi penggunaan, serta data log lainnya untuk tujuan keamanan,
                  pemeliharaan, dan analitik performa.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  💳 3. Informasi Transaksional
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={"1rem"}>
                  Jika Anda menggunakan layanan berbayar, kami dapat mengumpulkan
                  informasi terkait transaksi seperti detail pembayaran, riwayat
                  pembelian, dan informasi penagihan. Pemrosesan pembayaran dilakukan
                  melalui penyedia pihak ketiga yang memiliki standar keamanan industri,
                  dan kami tidak menyimpan detail kartu pembayaran secara langsung
                  kecuali dinyatakan sebaliknya.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🔗 4. Informasi dari Pihak Ketiga
                </Typography>
                <Typography variant="body2" color="text.secondary" fontSize={"1rem"}>
                  Dalam beberapa kasus, kami dapat menerima informasi dari layanan
                  pihak ketiga, seperti penyedia autentikasi (Single Sign-On),
                  integrasi API, atau mitra teknologi lainnya, sesuai dengan izin
                  dan pengaturan yang Anda setujui.
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Typography fontWeight={600} fontSize={"1.4rem"} sx={{ mb: 1 }}>
              How We Use Information
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }} fontSize={"1rem"}>
              Kami menggunakan informasi yang dikumpulkan hanya untuk tujuan yang sah,
              relevan, dan proporsional dengan layanan yang kami sediakan. Pemrosesan
              dilakukan untuk memastikan operasional layanan berjalan dengan aman,
              efisien, dan sesuai dengan ketentuan hukum yang berlaku.
            </Typography>

            <Stack spacing={1}>
              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  1️⃣ Penyediaan dan Pengelolaan Layanan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Digunakan untuk membuat dan mengelola akun pengguna, melakukan
                  autentikasi identitas, memproses transaksi, menyediakan fitur layanan,
                  serta memberikan dukungan teknis dan layanan pelanggan.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🔐 2. Keamanan dan Pencegahan Penyalahgunaan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Digunakan untuk mendeteksi, mencegah, dan menyelidiki aktivitas ilegal,
                  akses tidak sah, penyalahgunaan sistem, serta menjaga stabilitas dan
                  integritas infrastruktur teknologi kami.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  📊 3. Analitik dan Peningkatan Layanan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Digunakan untuk menganalisis pola penggunaan, memperbaiki bug,
                  meningkatkan performa sistem, mengembangkan fitur baru, serta
                  mengoptimalkan pengalaman pengguna secara keseluruhan.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  📩 4. Komunikasi Resmi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Digunakan untuk mengirim pemberitahuan terkait akun, pembaruan
                  kebijakan, perubahan layanan, informasi administratif, serta
                  merespons pertanyaan atau permintaan pengguna.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  ⚖️ 5. Kepatuhan Hukum dan Perlindungan Hak
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Digunakan untuk memenuhi kewajiban hukum, merespons permintaan resmi
                  otoritas yang berwenang, menegakkan syarat dan ketentuan layanan,
                  serta melindungi hak, keamanan, dan kepentingan sah perusahaan dan
                  pengguna.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🎯 6. Personalisasi dan Preferensi Pengguna
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Digunakan untuk mengingat preferensi pengguna, menyesuaikan tampilan
                  atau konfigurasi layanan, serta meningkatkan relevansi pengalaman
                  penggunaan tanpa melakukan pengambilan keputusan otomatis yang
                  berdampak hukum tanpa pemberitahuan yang jelas.
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Typography fontWeight={600} fontSize={"1.4rem"} sx={{ mb: 1 }}>
              🛡️ Data Protection & Rights
            </Typography>

            <Typography variant="body1" sx={{ maxWidth: "700px", mb: 2 }}>
              Kami menerapkan langkah-langkah teknis dan organisasi yang wajar untuk
              melindungi data pribadi dari akses tidak sah, kehilangan, penyalahgunaan,
              perubahan, atau pengungkapan yang tidak sah. Perlindungan ini dirancang
              untuk menjaga kerahasiaan, integritas, dan ketersediaan informasi.
            </Typography>

            <Stack spacing={1}>
              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🔐 1. Keamanan Teknis dan Infrastruktur
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kami menggunakan enkripsi, kontrol akses berbasis peran, pemantauan
                  sistem, firewall, dan mekanisme keamanan lainnya untuk melindungi
                  data dari ancaman eksternal maupun internal.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  👥 2. Pembatasan Akses Internal
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Akses terhadap data pribadi dibatasi hanya kepada personel yang
                  memerlukan informasi tersebut untuk menjalankan tugasnya. Setiap
                  akses dilakukan sesuai dengan prinsip kebutuhan yang sah (need-to-know basis).
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🗄️ 3. Retensi dan Penyimpanan Data
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data pribadi disimpan hanya selama diperlukan untuk memenuhi tujuan
                  pemrosesan atau sesuai kewajiban hukum yang berlaku. Setelah tidak
                  lagi diperlukan, data akan dihapus atau dianonimkan secara aman.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  📄 4. Hak Pengguna atas Data Pribadi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pengguna memiliki hak untuk mengakses, memperbaiki, memperbarui,
                  membatasi, atau meminta penghapusan data pribadi mereka sesuai dengan
                  peraturan yang berlaku. Permintaan dapat diajukan melalui kontak resmi
                  yang tersedia pada halaman ini.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🔄 5. Penarikan Persetujuan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Jika pemrosesan data didasarkan pada persetujuan, pengguna berhak
                  untuk menarik persetujuan tersebut kapan saja tanpa memengaruhi
                  keabsahan pemrosesan yang telah dilakukan sebelumnya.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🚨 6. Pelaporan Insiden Keamanan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dalam hal terjadi pelanggaran keamanan data yang berpotensi
                  berdampak signifikan terhadap pengguna, kami akan mengambil langkah
                  mitigasi yang diperlukan dan memberikan pemberitahuan sesuai dengan
                  ketentuan hukum yang berlaku.
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Typography fontWeight={600} fontSize={"1.2rem"} sx={{ mb: 1 }}>
              Third-Party Services
            </Typography>

            <Typography variant="body1" sx={{ maxWidth: "700px", mb: 2 }}>
              Dalam menjalankan layanan kami, kami dapat bekerja sama dengan penyedia
              layanan pihak ketiga yang membantu operasional, keamanan, analitik,
              maupun pemrosesan pembayaran. Kami memastikan bahwa setiap pihak ketiga
              yang bekerja sama dengan kami mematuhi standar perlindungan data yang
              sesuai dan relevan.
            </Typography>

            <Stack spacing={1}>
              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🔐 1. Penyedia Infrastruktur dan Hosting
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kami dapat menggunakan layanan hosting, penyimpanan cloud, dan
                  infrastruktur server untuk memastikan ketersediaan, keamanan, dan
                  performa sistem tetap optimal.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  💳 2. Penyedia Pembayaran
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Untuk layanan berbayar, transaksi diproses melalui penyedia pembayaran
                  pihak ketiga yang memiliki standar keamanan industri. Kami tidak
                  menyimpan detail kartu pembayaran secara langsung kecuali dinyatakan
                  secara eksplisit.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  📊 3. Layanan Analitik
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kami dapat menggunakan layanan analitik untuk memahami pola penggunaan,
                  meningkatkan performa, dan mengembangkan fitur baru. Data yang
                  digunakan untuk analitik umumnya bersifat agregat atau dianonimkan.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🛠 4. Layanan Pendukung Operasional
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Termasuk layanan email, sistem notifikasi, atau alat dukungan pelanggan
                  yang membantu kami berkomunikasi dan memberikan layanan yang lebih baik
                  kepada pengguna.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  ⚖️ 5. Kepatuhan dan Permintaan Hukum
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kami dapat mengungkapkan informasi kepada pihak ketiga jika diwajibkan
                  oleh hukum, perintah pengadilan, atau permintaan resmi dari otoritas
                  yang berwenang sesuai dengan ketentuan peraturan yang berlaku.
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Typography fontWeight={600} fontSize={"1.2rem"} sx={{ mb: 1 }}>
              Cookies and Tracking Technologies
            </Typography>

            <Typography variant="body1" sx={{ maxWidth: "700px", mb: 2 }}>
              Kami menggunakan cookies dan teknologi pelacakan serupa untuk memastikan
              layanan berjalan dengan baik, meningkatkan pengalaman pengguna, serta
              menjaga keamanan sistem. Informasi lebih rinci tersedia dalam Cookie
              Policy terpisah yang dapat diakses melalui tautan resmi kami.
            </Typography>

            <Stack spacing={1}>
              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🍪 1. Cookies Esensial
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Digunakan untuk fungsi dasar seperti autentikasi, manajemen sesi,
                  keamanan, dan akses fitur inti. Tanpa cookies ini, layanan tidak
                  dapat berfungsi dengan semestinya.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  ⚙️ 2. Cookies Preferensi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Digunakan untuk mengingat pengaturan dan preferensi pengguna,
                  seperti bahasa, tema tampilan, atau konfigurasi tertentu agar
                  pengalaman penggunaan menjadi lebih konsisten.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  📊 3. Cookies Analitik
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Digunakan untuk memahami bagaimana pengguna berinteraksi dengan
                  layanan kami, termasuk halaman yang dikunjungi, durasi akses, dan
                  pola penggunaan. Data ini umumnya dikumpulkan dalam bentuk agregat
                  atau anonim.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🔎 4. Teknologi Pelacakan Serupa
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Selain cookies, kami dapat menggunakan teknologi seperti web beacons,
                  pixel tags, atau local storage untuk tujuan keamanan, analitik,
                  dan optimalisasi performa sistem.
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🛑 5. Pengaturan dan Kontrol Pengguna
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pengguna dapat mengatur atau menonaktifkan cookies melalui
                  pengaturan browser masing-masing. Perlu diketahui bahwa pembatasan
                  cookies tertentu dapat memengaruhi fungsi atau pengalaman layanan.
                </Typography>
              </Box>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "700px", mt: 2 }}>
              Untuk informasi lengkap mengenai jenis cookies yang kami gunakan,
              tujuan pemrosesan, serta durasi penyimpanan, silakan merujuk pada
              dokumen Cookie Policy kami.
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography fontWeight={600} fontSize={"1.2rem"} sx={{ mb: 1 }}>
              Contact Information
            </Typography>

            <Typography variant="body1" sx={{ maxWidth: "700px", mb: 2 }}>
              Jika Anda memiliki pertanyaan, permintaan, atau keluhan terkait
              kebijakan privasi ini maupun pemrosesan data pribadi Anda, silakan
              menghubungi kami melalui informasi berikut:
            </Typography>

            <Stack spacing={1}>
              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  📧 Email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  privacy@jasakode.com
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🏢 Legal & Compliance Department
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Jasakode
                </Typography>
              </Box>

              <Box sx={{ maxWidth: "700px" }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  🌐 Website
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  https://jasakode.com
                </Typography>
              </Box>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: "700px", mt: 2 }}>
              Kami akan berupaya menanggapi setiap permintaan dalam jangka waktu
              yang wajar sesuai dengan ketentuan hukum yang berlaku.
            </Typography>
          </Box>
        </Stack>
        <Stack spacing={1}>
          <Accordion
            disableGutters
            elevation={0}
            square
            sx={{
              backgroundColor: "transparent",
              borderStyle: "none",
              boxShadow: "none",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Information We Collect</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body1" sx={{ maxWidth: "700px" }}>
                  Kami mengumpulkan informasi untuk menyediakan, mengelola,
                  meningkatkan, dan mengamankan layanan kami. Informasi yang
                  dikumpulkan dapat mencakup kategori berikut:
                </Typography>

                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    1. Informasi yang Anda Berikan Secara Langsung
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Termasuk nama, alamat email, nomor telepon, dan informasi akun
                    yang diberikan saat pendaftaran atau komunikasi dengan kami.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    2. Informasi yang Dikumpulkan Secara Otomatis
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Seperti alamat IP, jenis perangkat, sistem operasi, browser,
                    halaman yang dikunjungi, serta waktu dan durasi akses.
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    3. Informasi Transaksional
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Detail pembayaran dan riwayat transaksi untuk layanan berbayar,
                    yang diproses melalui penyedia pembayaran pihak ketiga.
                  </Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            disableGutters
            elevation={0}
            square
            sx={{
              backgroundColor: "transparent",
              borderStyle: "none",
              boxShadow: "none",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
    </Container>
  );
}
