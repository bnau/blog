import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import type { APIContext } from 'astro';
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";

export async function GET(context: APIContext) {
  const allPosts = await getCollection('blog');
  const baseUrl = context.site || 'https://bertrand-nau.fr';

  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const sortedPosts = allPosts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: baseUrl,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
    },
    items: sortedPosts.map((post) => {

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}/`,
        customData: `<media:content
          type="image/${post.data.cover.format == "jpg" ? "jpeg" : "png"}"
          width="${post.data.cover.width}"
          height="${post.data.cover.height}"
          medium="image"
          url="${`${baseUrl}/${post.data.cover.src}`}" />`
      }
    }),
    customData: `<language>fr</language>`,
  });
}
