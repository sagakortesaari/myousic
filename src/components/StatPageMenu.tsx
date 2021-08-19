import React from "react";
import styled from "styled-components";
import { User } from "../types";

const OuterWrapper = styled.div``;

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
        <ParagraphText>Signed in as {props.user?.display_name}</ParagraphText>
      </OuterWrapper>
    </>
  );
};
