import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import type { APIContext } from 'astro';
import { transform, walk } from "ultrahtml";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import sanitize from "ultrahtml/transformers/sanitize";

export async function GET(context: APIContext) {
  const allPosts = await getCollection('blog');
  const baseUrl = context.site?.href || 'https://bertrand-nau.fr';

  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const sortedPosts = allPosts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site || 'https://bertrand-nau.fr',
    items: await Promise.all(sortedPosts.map(async (post) => {
      const { Content } = await render(post);
      const rawContent = await container.renderToString(Content);
      const content = await transform(rawContent.replace(/^<!DOCTYPE html>/, ""), [
        async (node) => {
          await walk(node, (node) => {
            if (node.name === "a" && node.attributes.href?.startsWith("/")) {
              node.attributes.href = baseUrl + node.attributes.href;
            }
            if (node.name === "img" && node.attributes.src?.startsWith("/")) {
              node.attributes.src = baseUrl + node.attributes.src;
            }
          });
          return node;
        },
        sanitize({ dropElements: ["script", "style"] }),
      ]);

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.id}/`,
        content,
        ...(post.data.updatedDate && {
          customData: `<updated>${post.data.updatedDate.toISOString()}</updated>`
        }),
      }
    })),
    customData: `<language>fr</language>`,
  });
}
