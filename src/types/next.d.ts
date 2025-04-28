import { Metadata } from 'next'

declare module 'next' {
  export interface PageProps {
    params: {
      id: string
    }
    searchParams?: { [key: string]: string | string[] | undefined }
  }
} 