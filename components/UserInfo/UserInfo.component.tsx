import { FC } from "react";
import cn from "classnames";

import { UserInfoProps } from "./UserInfo.props";

import styles from "./UserInfo.module.scss";

export const UserInfo: FC<UserInfoProps> = ({ className, user, ...props }) => {
  return (
    <div className={cn(styles.info, className)}>
      <ul className={cn(styles.list)}>
        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>First name</span>
          <span className={cn(styles.item__value)}>{user.firstName}</span>
        </li>
        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>Last name</span>
          <span className={cn(styles.item__value)}>{user.lastName}</span>
        </li>
        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>Gender</span>
          <span className={cn(styles.item__value)}>{user.gender}</span>
        </li>
        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>Institute</span>
          <span className={cn(styles.item__value)}>{user.institute}</span>
        </li>
        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>Specialty</span>
          <span className={cn(styles.item__value)}>{user.specialty}</span>
        </li>

        {user.description && (
          <li className={cn(styles.item)}>
            <span className={cn(styles.item__title)}>Description</span>
            <span className={cn(styles.item__value)}>{user.description}</span>
          </li>
        )}

        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>Country</span>
          <span className={cn(styles.item__value)}>{user.country}</span>
        </li>
        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>City</span>
          <span className={cn(styles.item__value)}>{user.city}</span>
        </li>
        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>Address</span>
          <span className={cn(styles.item__value)}>{user.address}</span>
        </li>
        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>Postal code</span>
          <span className={cn(styles.item__value)}>{user.postalCode}</span>
        </li>
        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>Phone</span>
          <span className={cn(styles.item__value)}>{user.phone}</span>
        </li>
        <li className={cn(styles.item)}>
          <span className={cn(styles.item__title)}>Email</span>
          <span className={cn(styles.item__value)}>{user.email}</span>
        </li>
      </ul>
    </div>
  );
};
