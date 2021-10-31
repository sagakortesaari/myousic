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

const TrackImage = styled.img`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ArtistImage = styled.img`
  max-width: 300px;
  max-height: 300px;
`;

const TrackDiv = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
`;

const ArtistDiv = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-top: 45px;
`;

const TrackNum = styled.div`
  margin-right: 20px;
`;

type ListItemProps = {
  item: Track | Artist;
  num: number;
};

export const ListItem = (props: ListItemProps) => {
  return (
    <>
      {(props.item as Artist).images ? (
        <ArtistDiv>
          <ArtistImage src={(props.item as Artist).images![0].url} />
          <ParagraphText>
            <b>
              {props.num + 1}. {props.item.name}
            </b>
          </ParagraphText>
        </ArtistDiv>
      ) : (
        <TrackDiv>
          <TrackNum>
            <ParagraphText>{props.num + 1}. </ParagraphText>
          </TrackNum>
          <TrackImage src={(props.item as Track).album.images![0].url} />
          <TrackWrapper>
            <ParagraphText>
              <b>{props.item.name}</b>
            </ParagraphText>
            <ParagraphText>
              {(props.item as Track).artists[0].name}
            </ParagraphText>
          </TrackWrapper>
        </TrackDiv>
      )}
    </>
  );
};
