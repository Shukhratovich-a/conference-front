import { FC, useState, useEffect } from "react";
import cn from "classnames";

import { MainTextProps } from "./MainText.props";

import styles from "./MainText.module.scss";

export const MainText: FC<MainTextProps> = ({ className, mainText, sections, ...props }) => {
  const [mainTextState, setMainTextState] = useState<string>(mainText);

  useEffect(() => {
    if (mainText.includes("<p><code>sections</code></p>")) {
      const htmlSections = `<ol>${
        sections && !!sections.length && sections.map((section) => `<li>${section.title}</li>`).join("")
      }</ol>`;
      const body = mainText.split("<p><code>sections</code></p>").join(htmlSections);

      setMainTextState(body);
    }
  }, [mainText, sections]);

  return (
    <div className={cn(styles.wrapper, className)} dangerouslySetInnerHTML={{ __html: mainTextState }} {...props} />
  );
};
