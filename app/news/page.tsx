import styles from "./page.module.css";
import NewsCard from "@/components/NewsCard/NewsCard";
import React from "react";

type NewsArticle = {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

const News = async () => {
  const apiKey = process.env.NEWS_API_KEY;
  const query = `
  climate OR environment OR sustainability OR green energy OR renewable energy OR
  solar OR wind OR biodiversity OR conservation OR pollution OR emissions OR
  sustainable development OR climate action OR carbon neutrality OR eco-friendly OR
  net zero OR environmental responsibility OR corporate social responsibility OR
  green technology OR energy efficiency OR recycling OR wildlife OR clean air
`;

  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const fromDate = lastWeek.toISOString().split("T")[0];
  const toDate = today.toISOString().split("T")[0];
  const sortBy = "publishedAt";

  const url = `https://newsapi.org/v2/everything?q=${query}&from=${fromDate}&to=${toDate}&sortBy=${sortBy}&apiKey=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const data = await res.json();

  const filteredArticles = data.articles.filter(
    (article: NewsArticle) =>
      article.title.toLowerCase().includes("climate") ||
      article.title.toLowerCase().includes("environment") ||
      article.title.toLowerCase().includes("sustainability")
  );

  return (
    <div className={styles.newsPage}>
      <h1 className={styles.pageTitle}>Environmental News</h1>
      <div className={styles.newsGrid}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article: NewsArticle) => (
            <NewsCard
              key={article.url}
              source={article.source}
              author={article.author}
              title={article.title}
              description={article.description}
              url={article.url}
              urlToImage={article.urlToImage}
              publishedAt={article.publishedAt}
              content={article.content}
            />
          ))
        ) : (
          <p className={styles.noArticles}>
            No relevant articles found for this week.
          </p>
        )}
      </div>
    </div>
  );
};

export default News;
