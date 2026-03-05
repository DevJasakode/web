import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from '@mui/material'
import type { Article } from './types';
import { SmartLink } from '@/components/link';

interface ArticleCardProps {
  article: Article
}

const badgeColorMap: Record<string, 'primary' | 'secondary' | 'success' | 'warning'> = {
  NEW: 'secondary',
  FEATURED: 'primary',
  TRENDING: 'warning',
  GUIDE: 'success',
  INSIGHTS: 'primary',
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { title, excerpt, image, author, date, badge } = article

  return (
    <Card sx={{ borderRadius: 3, height: '100%' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            aspectRatio: '16 / 9',
            width: '100%',
            objectFit: 'cover',
          }}
        />
        {badge && (
          <Chip
            label={badge}
            size="small"
            color={badgeColorMap[badge]}
            sx={{ position: 'absolute', top: 8, left: 8 }}
          />
        )}
      </Box>

      <CardContent>
        <Typography variant="caption" color="text.secondary">
          <strong>{author}</strong> • {date}
        </Typography>

        <SmartLink href={{ pathname: "/[locale]/article/slug" }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              mt: 1,
              cursor: 'pointer',
              transition: 'color 0.2s ease, transform 0.2s ease',
              '&:hover': {
                color: 'primary.main',
                transform: 'translateX(2px)',
              },
            }}
          >
            {title}
          </Typography>
        </SmartLink>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {excerpt}
        </Typography>
      </CardContent>
    </Card>
  )
}
