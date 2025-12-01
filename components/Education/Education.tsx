import cn from "classnames";
import s from "@/components/Education/Education.module.scss";
import Tag from "../Tag/Tag";
import { Button } from "../ui/button";

interface EducationItem {
  id: string;
  name?: string;
  degree?: string;
  date?: string;
  location?: string;
}

interface EducationProps {
  items?: EducationItem[];
}

const educationItems: EducationItem[] = [
  {
    id: "1",
    name: "Kiel University of Applied Sciences, FH Kiel",
    degree: "Master of Science (M.Sc.) in Information Engineering",
    date: "April 2023",
    location: "Kiel, Germany",
  },
  {
    id: "2",
    name: "National College of Computer Studies, NCCS",
    degree: "Bachelor in Information Management",
    date: "2010 - 2014",
    location: "Kathmandu, Nepal",
  },
];

export default function Education({ items = educationItems }: EducationProps) {
  return (
    <section className={cn(s["section-education"])}>
      <div className={cn(s["education__container"])}>
        <Tag label="education" iconName="EducationIcon" />
        <div className={cn(s["education__items"],'flex')}>
          {items.map((item) => (
            <div key={item.id} className={cn(s["education__item"],'rounded-2xl bg-gray-200 dark:bg-gray-200/10 border border-white/10 hover:border-white/5')}>
              <div>
                <p className={cn(s["education__degree"],'text-black dark:text-white')}>{item.degree}</p>
                <h3 className={cn(s["education__name"],'text-black dark:text-white/70')}>{item.name}</h3>
                <p className={cn(s["education__location"],'text-black dark:text-white/70')}>{item.location}</p>
              </div>
              <p className={cn(s["education__date-range"],'text-black dark:text-white/50 bg-gray-100 dark:bg-gray-200/10')}>{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
