import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function OrderedList({ children }: Props) {
  return <ol className="px-8 [counter-reset:item]">{children}</ol>;
}

function Item({ children }: Props) {
  return (
    <li
      className={`before:font-headings before:text-gray relative mb-8 list-none [counter-increment:item] marker:hidden before:content-["0"_counter(item)]`}
    >
      {children}
    </li>
  );
}

OrderedList.Item = Item;
