import { StatObject, Artist } from "../types";
import styled from "styled-components";

type ListItemProps = {
  statObj: StatObject | undefined;
};

const TrackOrArtistImage = styled.img`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ImageDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ParagraphText = styled.div`
  font-family: sofia-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
`;

export const ListItem = (props: ListItemProps) => {
  return (
    <>
      {props.statObj?.items.map((item) => {
        return (
          <>
            {(item as Artist).images ? (
              <ImageDiv>
                <TrackOrArtistImage src={(item as Artist).images![0].url} />
                <ParagraphText>{item.name}</ParagraphText>
              </ImageDiv>
            ) : (
              <h1> "hello" </h1>
            )}
          </>
        );
      })}
    </>
  );
};
