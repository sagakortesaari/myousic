import { StatObject } from "../types";
import { ListItem } from "./ListItem";

type ListItemProps = {
  statObj: StatObject | undefined;
};

export const ItemList = (props: ListItemProps) => {
  return (
    <>
      {props.statObj?.items.map((item) => {
        return (
          <>
            <ListItem item={item} />
          </>
        );
      })}
    </>
  );
};
