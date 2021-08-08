import React from "react";
import styled from "styled-components";
import { SpotifyIcon } from "../components/svg/SpotifyIcon";

const HeaderSubTextContainer = styled.div`
    font-family: sofia-pro, sans-serif;
    font-weight: 400;
    font-style: normal;
    background-color: black;
    color: white;
    width: 220px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
`;

const HeaderSubText = styled.p`
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 10px;
`;

export const HomePage = () => {
    return (
        <>
            <HeaderSubTextContainer>
                <SpotifyIcon />
                <HeaderSubText> Connect with Spotify </HeaderSubText>
            </HeaderSubTextContainer>
        </>
    );
};
