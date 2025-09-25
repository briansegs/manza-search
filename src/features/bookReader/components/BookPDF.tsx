/* eslint-disable jsx-a11y/alt-text */
'use client'

import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer'
import { Book } from '@/payload-types'
import { fetchImageForPdf } from '@/utilities/fetchImageForPdf'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 18,
    lineHeight: 1.6,
  },

  coverPage: {
    padding: 0,
  },
  coverImage: {
    maxWidth: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  h1: { fontSize: 32, marginBottom: 24, fontWeight: 'bold' },
  h2: { fontSize: 24, marginBottom: 16, fontWeight: 'bold' },
  h3: { marginBottom: 16, fontWeight: 'bold' },

  paragraph: { marginBottom: 16, textAlign: 'justify' },

  imagePage: {
    padding: 40,
    fontFamily: 'Times-Roman',
    lineHeight: 1.6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { maxWidth: '100%', height: 'auto', marginVertical: 10, objectFit: 'cover' },
  imageCaption: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  underline: { textDecoration: 'underline' },

  center: { textAlign: 'center' },
})

type LexicalNode =
  | {
      type: 'root' | 'paragraph' | 'heading'
      children?: LexicalNode[]
      tag?: string
      format?: string
    }
  | {
      type: 'text'
      text: string
      format?: {
        bold?: boolean
        italic?: boolean
        underline?: boolean
      }
    }
  | {
      type: 'image'
      image?: { cloudinary?: { secure_url?: string } }
    }

function renderLexicalNode(node: LexicalNode): React.ReactNode {
  if (!node) return null

  switch (node.type) {
    case 'root':
      return node.children?.map((child, i) => <View key={i}>{renderLexicalNode(child)}</View>)

    case 'paragraph':
      const align = node.format === 'center' ? styles.center : {}
      return (
        <Text style={[styles.paragraph, align]}>
          {node.children?.map((child) => renderLexicalNode(child))}
        </Text>
      )

    case 'heading': {
      const align = node.format === 'center' ? styles.center : {}
      const heading = node.tag === 'h2' ? styles.h2 : styles.h3
      return (
        <Text style={[align, heading]}>
          {node.children?.map((child) => renderLexicalNode(child))}
        </Text>
      )
    }

    case 'text': {
      const appliedStyles = []
      if (node.format?.bold) appliedStyles.push(styles.bold)
      if (node.format?.italic) appliedStyles.push(styles.italic)
      if (node.format?.underline) appliedStyles.push(styles.underline)

      return <Text style={appliedStyles.length ? appliedStyles : {}}>{node.text}</Text>
    }

    case 'image': {
      const src = fetchImageForPdf(node.image?.cloudinary?.secure_url || '')
      return src ? (
        <Image src={src} style={{ maxWidth: '100%', marginVertical: 10, objectFit: 'contain' }} />
      ) : null
    }

    default:
      return null
  }
}

export function BookPDF({ book }: { book: Book }) {
  const { authorName, summary, information, chapters, cover } = book.content || {}
  const coverUrl = cover && typeof cover === 'object' ? cover.cloudinary?.secure_url : null
  const normalizedCover = coverUrl ? fetchImageForPdf(coverUrl) : null

  return (
    <Document>
      {/* Cover */}
      {normalizedCover && (
        <Page size="A4" style={styles.coverPage}>
          <Image src={normalizedCover} style={styles.coverImage} />
        </Page>
      )}

      {/* Title page */}
      <Page size="A4" style={styles.page}>
        <Text style={[styles.h1, { textAlign: 'center' }]}>{book.title}</Text>
        {authorName && (
          <Text style={[styles.h2, { textAlign: 'center', marginBottom: 40 }]}>
            By: {authorName}
          </Text>
        )}

        {summary && (
          <>
            <Text style={styles.h3}>Summary:</Text>
            <Text style={styles.paragraph}>{summary}</Text>
          </>
        )}

        {information && (
          <>
            <Text style={styles.h3}>Information:</Text>
            <Text style={styles.paragraph}>{information}</Text>
          </>
        )}
      </Page>

      {/* Chapters */}
      {chapters?.map((chapter, ci) =>
        typeof chapter === 'object' && chapter.content
          ? chapter.content.map((block, bi) => {
              if (block.blockType === 'textPage' && block.body?.root) {
                return (
                  <Page key={`${ci}-${bi}`} size="A4" style={styles.page}>
                    {renderLexicalNode(block.body.root as LexicalNode)}
                  </Page>
                )
              }

              if (
                block.blockType === 'imagePage' &&
                typeof block.image === 'object' &&
                block.image?.cloudinary?.secure_url
              ) {
                const src = fetchImageForPdf(block.image.cloudinary.secure_url || '')

                return (
                  <Page key={`${ci}-${bi}`} size="A4" style={styles.imagePage}>
                    <Image src={src || ''} style={styles.image} />
                    {block.caption && <Text style={styles.imageCaption}>{block.caption}</Text>}
                  </Page>
                )
              }

              return null
            })
          : null,
      )}
    </Document>
  )
}
