import Link from "next/link";
import Image from "next/image";
import styles from "./NewsCard.module.css";

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

const NewsCard = ({
  title,
  author,
  description,
  url,
  urlToImage,
  publishedAt,
}: NewsArticle) => {
  return (
    <div className={styles.newsCard}>
      <div className={styles.imageContainer}>
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            className={styles.image}
            width={500}
            height={300}
          />
        ) : (
          <div className={styles.placeholderImage}>Image Not Available</div>
        )}
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.meta}>
          <span className={styles.date}>
            {new Date(publishedAt).toLocaleDateString()}
          </span>
          {author && <span className={styles.author}>by {author}</span>}
        </div>
        <p className={styles.description}>{description}</p>
        <Link href={url} target="_blank" className={styles.readMore}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
