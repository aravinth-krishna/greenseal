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
  const query =
    "climate change OR 'carbon footprint' OR 'greenhouse gases' OR 'climate policy' OR 'company environmental impact' OR 'corporate sustainability' OR 'clean energy' OR 'renewable energy' OR 'solar energy' OR 'wind energy' OR 'pollution' OR 'carbon emissions' OR 'green technology' OR 'energy transition' OR 'climate science' OR 'environmental policy' OR 'sustainable business practices' OR 'environmental impact assessment'";
  const fromDate = "2024-11-12";
  const toDate = "2024-11-14";
  const sortBy = "popularity";

  const url = `https://newsapi.org/v2/everything?q=${query}&from=${fromDate}&to=${toDate}&sortBy=${sortBy}&apiKey=${apiKey}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const data = await res.json();

  return (
    <div className={styles.newsPage}>
      <h1 className={styles.pageTitle}>Environmental News</h1>
      <div className={styles.newsGrid}>
        {data.articles.map((article: NewsArticle) => (
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
        ))}
      </div>
    </div>
  );
};

export default News;
