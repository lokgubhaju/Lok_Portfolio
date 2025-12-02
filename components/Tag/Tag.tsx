import cn from "classnames";
import { Icon, IconName } from "../Icon/Icon";
import s from "./Tag.module.scss";
import { LucideIcon } from "lucide-react";

interface TagProps {
  label: string;
  iconName?: IconName;
  lucideIcon?: LucideIcon;
}

export default function Tag({ label, iconName, lucideIcon }: TagProps) {
  const LucideIconComponent = lucideIcon;

  return (
    <div className={cn(s["tag"], "bg-[#00DE51] dark:bg-gray-200/10")}>
      {LucideIconComponent ? (
        <LucideIconComponent
          className={cn(s["tag__icon"], "text-black dark:text-[#00DE51]")}
        />
      ) : (
        iconName && (
          <Icon
            name={iconName}
            className={cn(s["tag__icon"], "text-black dark:text-[#00DE51]")}
          />
        )
      )}
      <span className={cn(s["tag__label"], "uppercase")}>{label}</span>
    </div>
  );
}
