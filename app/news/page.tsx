"use client";

import styles from "./page.module.css";
import NewsCard from "@/components/NewsCard/NewsCard";
import React, { useState, useEffect } from "react";

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

const News = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [timeRange, setTimeRange] = useState("lastMonth");

  const fetchNews = async (timeRange: string) => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const query = `
      climate OR environment OR sustainability OR "green energy" OR
      "renewable energy" OR pollution OR emissions OR conservation OR
      recycling OR wildlife OR biodiversity OR "carbon neutrality"
    `
      .replace(/\s+/g, " ")
      .trim();

    const today = new Date();
    const fromDate = new Date(today);

    switch (timeRange) {
      case "last24Hours":
        fromDate.setDate(today.getDate() - 1);
        break;
      case "last48Hours":
        fromDate.setDate(today.getDate() - 2);
        break;
      case "lastWeek":
        fromDate.setDate(today.getDate() - 7);
        break;
      case "lastMonth":
        fromDate.setMonth(today.getMonth() - 1);
        break;
      default:
        fromDate.setMonth(today.getMonth() - 1);
    }

    const fromDateString = `${fromDate.getFullYear()}-${(
      fromDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${fromDate.getDate().toString().padStart(2, "0")}`;
    const toDateString = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    const sortBy = "publishedAt";

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&from=${fromDateString}&to=${toDateString}&sortBy=${sortBy}&language=en&apiKey=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log("From Date:", fromDateString);
      console.log("To Date:", toDateString);
      console.log("Fetched data:", data); // Debug log

      if (data.articles) {
        const filteredArticles = data.articles.filter(
          (article: NewsArticle) =>
            !(
              article.title?.includes("[Removed]") ||
              article.description?.includes("[Removed]") ||
              article.content?.includes("[Removed]") ||
              !/\b(climate|environment|sustainability|green|renewable|pollution|emissions|conservation|recycling|wildlife|biodiversity|carbon)\b/i.test(
                `${article.title} ${article.description} ${article.content}`
              )
            )
        );
        setArticles(filteredArticles);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
    }
  };

  useEffect(() => {
    fetchNews(timeRange);
    console.log("Fetching news for", timeRange);
  }, [timeRange]);

  return (
    <div className={styles.newsPage}>
      <h1 className={styles.pageTitle}>Environmental News</h1>
      <div className={styles.infoContainer}>
        <p className={styles.infoText}>
          Stay updated with the latest environmental news. Use the filters to
          explore articles on topics such as climate change, sustainability,
          wildlife conservation, and renewable energy from different time
          periods.
        </p>
      </div>
      <div className={styles.filterContainer}>
        <label htmlFor="timeRange" className={styles.filterLabel}>
          Filter by Time Range:
        </label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="last24Hours">Last 24 Hours</option>
          <option value="last48Hours">Last 48 Hours</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
        </select>
      </div>

      <div className={styles.newsGrid}>
        {articles.length > 0 ? (
          articles.map((article: NewsArticle, index: number) => (
            <NewsCard
              key={`${article.url}-${index}`}
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
            No relevant articles found for this period.
          </p>
        )}
      </div>
    </div>
  );
};

export default News;
