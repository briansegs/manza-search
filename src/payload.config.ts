// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Globals/Footer/config'
import { Header } from './Globals/Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

import { Articles } from './collections/Articles'
import { HomeMedia } from './collections/HomeMedia'
import { Home } from './Globals/Home/config'
import { NEXT_PUBLIC_SERVER_URL } from 'next.config'
import { Scope } from './Globals/Scope/config'
import { Literature } from './Globals/Literature/config'
import { LiteratureMedia } from './collections/LiteratureMedia'
import { Sound } from './Globals/Sound/config'
import { SoundMedia } from './collections/SoundMedia'
import { Art } from './Globals/Art/config'
import { ArtMedia } from './collections/ArtMedia'
import { HealthAndWellnessMedia } from './collections/HealthAndWellnessMedia'
import { HealthAndWellness } from './Globals/HealthAndWellness/config'
import { TravelMedia } from './collections/TravelMedia'
import { Travel } from './Globals/Travel/config'
import { Topics } from './collections/Topics'
import { AdMedia } from './collections/AdMedia'
import { Signin } from './Globals/Signin/config'
import { ArticleMedia } from './collections/ArticleMedia'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin/BeforeLogin.tsx', '@/admin/UserTypeInit.tsx'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard', '@/admin/UserTypeInit.tsx'],

      // Logo and Icon
      graphics: {
        Icon: '@/components/Graphics/Icon.tsx#Icon',
        Logo: '@/components/Graphics/Logo.tsx#Logo',
      },
    },
    meta: {
      description: 'Where you find and study anything in the world.',
      icons: [{ type: 'image/png', rel: 'icon', url: `${NEXT_PUBLIC_SERVER_URL}/favicon.svg` }],
      titleSuffix: '- Manza Search',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [
    Pages,
    Posts,
    Articles,
    Media,
    HomeMedia,
    LiteratureMedia,
    SoundMedia,
    ArtMedia,
    TravelMedia,
    AdMedia,
    HealthAndWellnessMedia,
    ArticleMedia,
    Categories,
    Topics,
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Home, Scope, Literature, Sound, Travel, Art, HealthAndWellness, Signin],
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
