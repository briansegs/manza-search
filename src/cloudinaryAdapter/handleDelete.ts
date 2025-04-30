import type { HandleDelete } from '@payloadcms/plugin-cloud-storage/types'
import type { v2 as cloudinaryType } from 'cloudinary'

import path from 'path'
import { CollectionConfig } from 'payload'

interface Args {
  cloudinary: typeof cloudinaryType
  folder: string
  collection: CollectionConfig
}

export const getHandleDelete =
  ({ cloudinary, folder, collection }: Args): HandleDelete =>
  async ({ filename, req }) => {
    if (!filename || !collection.slug || !folder) {
      req.payload.logger.warn(`Missing filename, collection.slug, or folder. skipping delete`)
      return
    }

    const publicId = path.posix.join(folder, collection.slug, filename.replace(/\.[^/.]+$/, ''))

    try {
      await cloudinary.uploader.destroy(publicId)
    } catch (error) {
      console.error('Error deleting file from Cloudinary:', error)
      throw error
    }
  }
