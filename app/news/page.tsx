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
      climate OR environment OR sustainability OR "green energy" OR "renewable energy" OR
      solar OR wind OR biodiversity OR conservation OR pollution OR emissions OR
      "sustainable development" OR "climate action" OR "carbon neutrality" OR eco-friendly OR
      "net zero" OR "environmental responsibility" OR "corporate social responsibility" OR
      "green technology" OR "energy efficiency" OR recycling OR wildlife OR "clean air"
      OR nature OR "climate change" OR "global warming" OR "environmental protection"
    `
      .replace(/\s+/g, " ")
      .trim(); // Remove extra spaces and newlines

    const today = new Date();
    const fromDate = new Date(today);

    switch (timeRange) {
      case "last24Hours":
        fromDate.setDate(today.getDate() - 1);
        break;
      case "lastWeek":
        fromDate.setDate(today.getDate() - 7);
        break;
      case "lastMonth":
        fromDate.setMonth(today.getMonth() - 1);
        break;
      case "lastYear":
        fromDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        fromDate.setMonth(today.getMonth() - 1);
    }

    const fromDateString = fromDate.toISOString().split("T")[0];
    const toDateString = today.toISOString().split("T")[0];
    const sortBy = "publishedAt";

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&from=${fromDateString}&to=${toDateString}&sortBy=${sortBy}&language=en&searchIn=title,description,content&apiKey=${apiKey}`;

    try {
      console.log("Fetching news from URL:", url); // Debugging statement
      const res = await fetch(url);
      const data = await res.json();
      console.log("API response data:", data); // Debugging statement

      if (data.articles) {
        setArticles(data.articles);
      } else {
        console.error("No articles found in the response");
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
    }
  };

  useEffect(() => {
    fetchNews(timeRange);
  }, [timeRange]);

  return (
    <div className={styles.newsPage}>
      <h1 className={styles.pageTitle}>Environmental News</h1>
      <div className={styles.filterContainer}>
        <label htmlFor="timeRange">Filter by:</label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="last24Hours">Last 24 Hours</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>
      <div className={styles.newsGrid}>
        {articles.length > 0 ? (
          articles.map((article: NewsArticle, index: number) => (
            <NewsCard
              key={`${article.url}-${index}`} // Ensure unique key
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
