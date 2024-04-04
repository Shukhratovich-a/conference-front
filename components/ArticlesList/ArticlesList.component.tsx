import { FC, useState, useContext } from "react";
import cn from "classnames";

import { ArticlesListProps } from "./ArticlesList.props";

import { remove } from "@/api/article.api";

import { AuthContext } from "@/contexts/auth.context";

import { Button } from "@/components";

import styles from "./ArticlesList.module.scss";

export const ArticlesList: FC<ArticlesListProps> = ({ className, articles, ...props }) => {
  const { token } = useContext(AuthContext);
  const [articlesState, setArticlesState] = useState(articles);

  const handleDelete = async (id: number) => {
    if (!token) return;

    if (confirm("Are you sure?")) {
      const { status } = await remove(id, token);

      if (status === 200) {
        setArticlesState(articlesState.filter((article) => article.id !== id));
      }
    }
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {!!articlesState.length ? (
        <ul className={cn(styles.list)}>
          {articlesState.map((article) => (
            <li className={cn(styles.item)} key={article.id}>
              <span>{`${article.title}`}</span>
              <Button size="sm" onClick={() => handleDelete(article.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No articles yet</div>
      )}
    </div>
  );
};
