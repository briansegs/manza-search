import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc, payload }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, title, meta } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    // get full categories and keep a flattened copy of their most important properties
    try {
      const populated = await Promise.all(
        categories.map(async (cat) => {
          // cat could be an id string or an object with an id
          const categoryId = typeof cat === 'string' ? cat : cat.id
          const category = await payload.findByID({
            collection: 'categories',
            id: categoryId,
          })

          return {
            relationTo: 'categories',
            id: category.id,
            title: category.title,
          }
        }),
      )
      modifiedDoc.categories = populated
    } catch (_err) {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
      )
    }
  }

  return modifiedDoc
}
