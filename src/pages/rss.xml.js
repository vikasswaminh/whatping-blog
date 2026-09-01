import rss from '@astrojs/rss';
import { SITE } from '../config';
import { getPublishedPosts } from '../utils/posts';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: `${SITE.brand} Blog`,
    description: SITE.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate ? new Date(p.data.pubDate) : new Date(),
      link: `/blog/${p.slug}/`,
      categories: p.data.tags,
    })),
  });
}
