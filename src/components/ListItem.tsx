import React from "react";
import { Artist, Track } from "../types";
import styled from "styled-components";

const ParagraphText = styled.div`
  font-family: sofia-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const TrackWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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

type ListItemProps = {
  item: Track | Artist;
};

export const ListItem = (props: ListItemProps) => {
  return (
    <>
      {(props.item as Artist).images ? (
        <ImageDiv>
          <TrackOrArtistImage src={(props.item as Artist).images![0].url} />
          <ParagraphText>
            <b>{props.item.name}</b>
          </ParagraphText>
        </ImageDiv>
      ) : (
        <ImageDiv>
          <TrackOrArtistImage
            src={(props.item as Track).album.images![0].url}
          />
          <TrackWrapper>
            <ParagraphText>
              <b>{props.item.name}</b>
            </ParagraphText>
            <ParagraphText>
              {(props.item as Track).artists[0].name}
            </ParagraphText>
          </TrackWrapper>
        </ImageDiv>
      )}
    </>
  );
};
