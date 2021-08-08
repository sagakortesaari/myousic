import React from "react";
import styled from "styled-components";
import { Bird } from "../components/svg/Bird";
import { SpotifyIcon } from "../components/svg/SpotifyIcon";
import { createGlobalStyle } from "styled-components";

const HeaderText = styled.div`
  font-family: dejanire-headline, serif;
  font-weight: 400;
  font-style: normal;
  font-size: 40px;
  max-width: 750px;
  margin-bottom: 20px;
  display: inline-block;
`;

const ParagraphText = styled.div`
  font-family: sofia-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const HeaderSubTextContainer = styled(ParagraphText)`
  background-color: black;
  color: white;
  width: 220px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding: 5px;
  margin-top: 20px;
`;

const HeaderSubText = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  padding-left: 10px;
`;

const SvgWrapper = styled.div`
  max-width: 500px;
  max-height: 300px;
`;

const Wrapper = styled.div`
  max-width: 1300px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  height: 100vh;
`;

const GreenBlur = styled.div`
  background-color: #b6e3b4;
  width: 70%;
  max-width: 1000px;
  height: 800px;
  border-radius: 30px;
  filter: blur(100px);
  position: absolute;
  bottom: -100px;
  left: -100px;
  z-index: -1;
  border-radius: 50%;
  overflow: hidden;
`;

const PurpleBlur = styled.div`
  background-color: #c39cff;
  width: 70%;
  max-width: 1000px;
  height: 800px;
  border-radius: 30px;
  filter: blur(100px);
  position: absolute;
  z-index: -1;
  right: -100px;
  top: -300px;
  border-radius: 50%;
  overflow: hidden;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #FBF8FF;
    overflow: hidden;
  }
`;

export const HomePage = () => {
  return (
    <>
      <GlobalStyle />
      <GreenBlur>hi</GreenBlur>
      <PurpleBlur>hi</PurpleBlur>
      <Wrapper>
        <div>
          <HeaderText>
            Have you ever wondered who your all time favorite artists are?
          </HeaderText>
          <ParagraphText>... connect below and let's find out! </ParagraphText>
          <HeaderSubTextContainer>
            <SpotifyIcon />
            <HeaderSubText> Connect with Spotify </HeaderSubText>
          </HeaderSubTextContainer>
        </div>
        <SvgWrapper>
          <Bird />
        </SvgWrapper>
      </Wrapper>
    </>
  );
};
