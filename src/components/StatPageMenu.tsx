import React, { useState } from "react";
import styled from "styled-components";
import { User } from "../types";

const OuterWrapper = styled.div`
  & a:visited {
    color: #aad0a8;
    text-decoration: none;
  }

  & a:link {
    color: #aad0a8;
    text-decoration: none;
  }
`;

const ParagraphText = styled.div`
  font-family: sofia-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const TypeToggle = styled.div`
  display: flex;
`;

type StatPageMenuProps = {
  user: User | undefined;
  toggle: any;
};

export const StatPageMenu = (props: StatPageMenuProps) => {
  function toggleType(type: string) {
    props.toggle(type);
  }

  return (
    <>
      <OuterWrapper>
        <ParagraphText>
          Signed in as{" "}
          <a href={props.user?.external_urls.spotify} target="_blank">
            {props.user?.display_name}
          </a>
        </ParagraphText>
        <ParagraphText>
          <TypeToggle>
            <div
              style={{ marginRight: "10px" }}
              onClick={() => toggleType("artists")}
            >
              {" "}
              Artists{" "}
            </div>
            <div onClick={() => toggleType("tracks")}> Songs </div>
          </TypeToggle>
        </ParagraphText>
      </OuterWrapper>
    </>
  );
};
