import { useEffect, useState } from "react";
import { StatObject, StatObjectObj } from "../types";
import { ListItem } from "./ListItem";

type ListItemProps = {
  statObj: StatObject | undefined;
  term: string;
};

export const ItemList = (props: ListItemProps) => {
  let [mapObj, setMapObj] = useState<undefined | StatObjectObj>();

  useEffect(() => {
    setMapObj(props.statObj ? props.statObj![props.term] : undefined);
  }, [props.statObj, props.term]);

  return (
    <>
      {mapObj?.items.map((item) => {
        return (
          <>
            <ListItem item={item} />
          </>
        );
      })}
    </>
  );
};
