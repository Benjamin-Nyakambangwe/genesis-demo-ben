'use client'

import { toast } from 'sonner'
import { useEffect } from 'react'

interface ShowToastProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  description?: string
}

export function ShowToast({ message, type = 'default', description }: ShowToastProps) {
  useEffect(() => {
    switch (type) {
      case 'success':
        toast.success(message, {
          description
        })
        break
      case 'error':
        toast.error(message, {
          description
        })
        break
      case 'info':
        toast.info(message, {
          description
        })
        break
      case 'warning':
        toast.warning(message, {
          description
        })
        break
      default:
        toast(message, {
          description
        })
    }
  }, [message, type, description])

  return null
}