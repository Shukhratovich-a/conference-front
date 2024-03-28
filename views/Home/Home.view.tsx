import { FC } from "react";
import cn from "classnames";

import { HomeViewProps } from "./Home.props";

import styles from "./Home.module.scss";

export const HomeView: FC<HomeViewProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.view, className)} {...props}>
      <h2 className={cn(styles.heading)}>Home</h2>

      <p>
        Мирзо Улуғбек номидаги Ўзбекистон Миллий университети, Шароф Рашидов номидаги Самарқанд давлат университети, ЎзР
        ФА Математика институти, Natural Science publication Ўзбекистон миллий университетининг 105 йиллиги, Мусо
        ал-Хоразмийнинг 1240 йиллигига бағишланган навбатдаги VIII халқаро илмий “Амалий математика ва ахборот
        технологияларнинг долзарб муаммолари” – Ал-Хоразмий 2023 халқаро илмий конференциясини 2023 йил 25–26 сентябр
        кунлари Самарқанд давлат университетида ўтказади.
      </p>
    </div>
  );
};
