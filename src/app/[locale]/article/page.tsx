"use client";

import { Box, Container, Grid, Pagination } from '@mui/material'
import HeroSection from './HeroSection'
import ArticleCard from './ArticleCard'
import Sidebar from './Sidebar'
import type { Article } from './types'


const tags: string[] = [
  'Technology',
  'Travel',
  'Bank',
  'Business',
  'Management',
  'Trends',
]

const articles: Article[] = [
  {
    title: "Membangun SaaS yang Scalable Sejak Hari Pertama",
    excerpt:
      "Pendekatan arsitektur dan keputusan teknis awal yang menentukan apakah produk SaaS Anda akan bertahan saat trafik tumbuh.",
    image: "/assets/image/Screenshot from 2026-01-26 00-23-28.png",
    author: "Rizky Pratama",
    date: "2024-11-12",
    badge: "FEATURED",
  },
  {
    title: "Roadmap Produk: Dari Ide ke Eksekusi",
    excerpt:
      "Panduan praktis menyusun roadmap produk yang realistis tanpa kehilangan fleksibilitas terhadap perubahan pasar.",
    image: "/assets/image/Screenshot from 2026-01-26 00-23-28.png",
    author: "Alya Putri",
    date: "2024-10-28",
    badge: "GUIDE",
  },
  {
    title: "Kenapa Banyak Startup Gagal di Tahun Kedua?",
    excerpt:
      "Analisis pola kegagalan startup berdasarkan data dan pengalaman teknis di lapangan.",
    image: "/assets/image/Screenshot from 2026-01-26 00-23-28.png",
    author: "Dimas Saputra",
    date: "2024-09-15",
    badge: "INSIGHTS",
  },
  {
    title: "Tech Stack Modern yang Sedang Naik Daun di 2025",
    excerpt:
      "Tinjauan teknologi frontend dan backend yang paling banyak diadopsi oleh tim engineering saat ini.",
    image: "/assets/image/Screenshot from 2026-01-26 00-23-28.png",
    author: "Nadia Lestari",
    date: "2025-01-03",
    badge: "TRENDING",
  },
  {
    title: "Peluncuran Platform Developer Baru Kami",
    excerpt:
      "Kami memperkenalkan platform baru yang dirancang untuk mempercepat kolaborasi antara tim produk dan engineering.",
    image: "/assets/image/Screenshot from 2026-01-26 00-23-28.png",
    author: "Jasakode Team",
    date: "2025-01-20",
    badge: "NEW",
  },
  {
    title: "Mengelola Technical Debt Tanpa Menghambat Growth",
    excerpt:
      "Strategi realistis menjaga kualitas kode sambil tetap bergerak cepat dalam pengembangan produk.",
    image: "/assets/image/Screenshot from 2026-01-26 00-23-28.png",
    author: "Fajar Hidayat",
    date: "2024-12-02",
  },
];


export default function Article() {
  const hasArticles = Array.isArray(articles) && articles.length > 0

  return (
    <Box component="main">
      <HeroSection tags={tags} />

      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Grid spacing={4}>
          {/* MAIN */}
          <Grid size={{ xs: 12, lg: 8 }}>
            {hasArticles ? (
              <Box sx={{ mb: 4 }}>
                <Grid container spacing={3}>
                  {articles.map((article, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
                      <ArticleCard article={article} />
                    </Grid>
                  ))}
                </Grid>

                <Box
                  sx={{
                    mt: 4,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Pagination count={3} />
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  mb: 4,
                  minHeight: 240,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 3,
                  color: 'text.secondary',
                }}
              >
                No articles available
              </Box>
            )}
          </Grid>

          {/* SIDEBAR */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Sidebar />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

