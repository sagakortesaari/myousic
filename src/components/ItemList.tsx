import { useEffect, useState } from "react";
import styled from "styled-components";
import { StatObject, StatObjectObj } from "../types";
import { ListItem } from "./ListItem";

type ListItemProps = {
  statObj: StatObject | undefined;
  term: string;
  type: string;
};

const ArtistDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 100px;
`;

export const ItemList = (props: ListItemProps) => {
  let [mapObj, setMapObj] = useState<undefined | StatObjectObj>();

  useEffect(() => {
    setMapObj(props.statObj ? props.statObj![props.term] : undefined);
  }, [props.statObj, props.term]);

  return (
    <>
      {props.type == "artist" ? (
        <ArtistDiv>
          {mapObj?.items.map((item, index) => {
            return (
              <>
                <ListItem item={item} num={index} />
              </>
            );
          })}
        </ArtistDiv>
      ) : (
        mapObj?.items.map((item, index) => {
          return (
            <>
              <ListItem item={item} num={index} />
            </>
          );
        })
      )}
    </>
  );
};
