export type ArticleStatus = "published" | "draft";

export type Article = {
  slug: string;
  title: string;
  dek: string;
  status: ArticleStatus;
};

/**
 * Public Articles live at `/articles`.
 * Drafts stay off the index. Do not place carousel copy here.
 */
export const articles: readonly Article[] = [];

export function publishedArticles(records: readonly Article[] = articles): Article[] {
  return records.filter((article) => article.status === "published");
}
