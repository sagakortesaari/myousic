import React from "react";
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

type StatPageMenuProps = {
  user: User | undefined;
};

export const StatPageMenu = (props: StatPageMenuProps) => {
  return (
    <>
      <OuterWrapper>
        <ParagraphText>
          Signed in as{" "}
          <a href={props.user?.external_urls.spotify} target="_blank">
            {props.user?.display_name}
          </a>
        </ParagraphText>
      </OuterWrapper>
    </>
  );
};
