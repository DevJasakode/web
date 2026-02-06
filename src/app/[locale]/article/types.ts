export type ArticleBadge =
  | 'NEW'
  | 'FEATURED'
  | 'TRENDING'
  | 'GUIDE'
  | 'INSIGHTS'

export interface Article {
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  badge?: ArticleBadge
}
