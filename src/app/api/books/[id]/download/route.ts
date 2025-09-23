import puppeteer from 'puppeteer'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!id) {
    return new Response(JSON.stringify({ error: 'Book ID is required' }), { status: 400 })
  }

  const payload = await getPayload({ config })

  const book = await payload.findByID({
    collection: 'books',
    id,
    depth: 2,
  })

  if (!book) {
    return new Response(JSON.stringify({ error: 'Book not found' }), { status: 404 })
  }

  const { authorName, summary, information, chapters, cover } = book.content || {}

  const coverImage = cover && typeof cover === 'object' ? cover.cloudinary?.secure_url : ''

  // Generate HTML for PDF
  const htmlContent = `
    <html>
      <head>
        <style>
          body {  
              font-size: 1.125rem;   
              line-height: 1.6;      
              font-family: Georgia, "Times New Roman", serif;  
              }
           h1 { font-size: 3rem;     
              margin-bottom: 2rem;
              font-weight: bold; }
          h2 { font-size: 2rem;     
              margin-bottom: 1.5rem;
              font-weight: bold; }
          h3 { font-size: 1.5rem;
              margin-top: 2rem;
              margin-bottom: 1rem; }
      
          p {  margin-bottom: 1rem; 
              text-align: justify; }
          .page { page-break-before: always; }
          .page:first-of-type {
              page-break-before: auto; /* don’t push the very first .page */
            }
          .page-margin-padding { margin: 3rem auto; padding: 0 2rem; max-width: 65ch; }
          .cover {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              
              }
          .cover img {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
              margin: 0; /* remove default/extra margins */
              display: block;
            }
          .title-page { display: flex; flex-direction: column; gap: 8px}
          p.prose-p { margin-bottom: 1rem; 
              text-align: justify; }
          h2.prose-h2 { font-size: 2rem;     
              margin-bottom: 1.5rem;
              font-weight: bold;  }
          h3.prose-h3 { font-size: 1.5rem;
              margin-top: 2rem;
              margin-bottom: 1rem; }
          .center-page {
              display: flex;
              flex-direction: column;
              justify-content: center;  
              align-items: center;     
              height: 100vh;            
            }
        
        </style>
      </head>
      <body>
          <!-- Cover page -->
          <div class=" cover">
            ${coverImage ? `<img src="${coverImage}" alt="cover image" />` : ''}
          </div>

          <!-- Title & author page -->
          <div class="title-page page-margin-padding">
            <h1>${book.title}</h1>
            ${authorName ? `<h2>By: ${authorName}</h2>` : ''}
            <div>
            <h3>Summary:</h3>
            ${summary ? `<p>${summary}</p>` : ''}
            </div>

             <div>
            <h3>Information:</h3>
            ${information ? `<p>${information}</p>` : ''}
            </div>
            
          </div>

          <!-- Chapters -->
          ${chapters
            ?.map((chapter) => {
              return (
                typeof chapter === 'object' &&
                chapter.content &&
                chapter.content
                  ?.map((block) => {
                    if (block.blockType === 'textPage' && block.body?.root) {
                      const html = lexicalNodesToHTML(block.body.root as LexicalNode)
                      return `<div class="page page-margin-padding">${html}</div>`
                    }
                    if (
                      block.blockType === 'imagePage' &&
                      typeof block.image === 'object' &&
                      block.image?.cloudinary?.secure_url
                    ) {
                      return `
                    <div class="page center-page page-margin-padding">
                    <img src="${block.image.cloudinary.secure_url}" style="max-width: 100%; margin: 1em 0;" />
                    
                    <div>${block.caption || ''}</div>
                    </div>`
                    }
                    return ''
                  })
                  .join('')
              )
            })
            .join('')}
          
          
      </body>
    </html>
  `

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' })
  await page.emulateMediaType('print')
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
  })
  await browser.close()

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${book.title}.pdf"`,
    },
  })
}

type LexicalNode =
  | {
      type: 'root' | 'paragraph' | 'heading'
      children?: LexicalNode[]
      tag?: string
      format?: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
    }
  | {
      type: 'text'
      text: string
      format?: {
        bold?: boolean
        italic?: boolean
        underline?: boolean
        center?: boolean
      }
    }
  | {
      type: 'image'
      image?: { cloudinary?: { secure_url?: string } }
    }

function lexicalNodesToHTML(node: LexicalNode): string {
  if (!node) return ''

  switch (node.type) {
    case 'root':
    case 'paragraph':
    case 'heading': {
      const children = node.children ?? []
      const content = children.map(lexicalNodesToHTML).join('')

      if (node.type === 'paragraph') {
        const align = node.format === 'center' ? 'text-align:center;' : ''
        return `<p class="prose-p" style="${align}">${content}</p>`
      }

      if (node.type === 'heading') {
        const tag = node.tag || 'h2'
        const align = node.format === 'center' ? 'text-align:center;' : ''
        const cls = tag === 'h2' ? 'prose-h2' : tag === 'h3' ? 'prose-h3' : ''
        return `<${tag} class="${cls}" style="${align}">${content}</${tag}>`
      }

      // root just returns children
      return content
    }

    case 'text': {
      let text = node.text || ''
      if (node.format?.bold) text = `<strong>${text}</strong>`
      if (node.format?.italic) text = `<em>${text}</em>`
      if (node.format?.underline) text = `<u>${text}</u>`
      return text
    }

    case 'image': {
      const src = node.image?.cloudinary?.secure_url || ''
      return `<img src="${src}" style="max-width:100%; margin:1em 0;" />`
    }

    default:
      return ''
  }
}
