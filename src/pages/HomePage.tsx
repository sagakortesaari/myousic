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

const LogInButton = styled.a`
  margin-top: 0px;
  margin-bottom: 0px;
  padding-left: 10px;
`;

const SvgWrapper = styled.div`
  max-width: 500px;
  max-height: 300px;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  height: 100vh;

  & a:visited {
    color: white;
    text-decoration: none;
  }

  & a:link {
    color: white;
    text-decoration: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export const HomePage = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div>
          <HeaderText>
            {" "}
            <b> myousic </b>{" "}
          </HeaderText>
          <HeaderText>
            Ever wondered who your all time favorite artists are?
          </HeaderText>
          <ParagraphText>... connect below and let's find out! </ParagraphText>
          <HeaderSubTextContainer>
            <SpotifyIcon />
            <LogInButton href="http://192.168.0.33:8080/authorize">
              {" "}
              Connect with Spotify{" "}
            </LogInButton>
          </HeaderSubTextContainer>
        </div>
        <SvgWrapper>
          <Bird />
        </SvgWrapper>
      </Wrapper>
    </>
  );
};
