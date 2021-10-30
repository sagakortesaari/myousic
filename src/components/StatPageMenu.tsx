import styled from "styled-components";
import { User } from "../types";

const OuterWrapper = styled.div`
  margin-bottom: 20px;

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

const PersonalizedMenu = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  & > img {
    border-radius: 50%;
    margin-right: 20px;
  }
`;

const SignedIn = styled.div``;

const TypeToggle = styled.div`
  display: flex;
`;

const TimeToggle = styled.div`
  display: flex;
`;

const TimeToggleText = styled.div`
  margin-right: 10px;
`;

type StatPageMenuProps = {
  user: User | undefined;
  toggle: any;
  toggleTime: any;
};

export const StatPageMenu = (props: StatPageMenuProps) => {
  function toggleType(type: string) {
    props.toggle(type);
  }

  function toggleTime(type: string) {
    props.toggleTime(type);
  }

  return (
    <>
      <OuterWrapper>
        <ParagraphText>
          <PersonalizedMenu>
            <img
              src={props.user?.image}
              alt="profilepic"
              width="150"
              height="150"
            />
            <SignedIn>
              Signed in as{" "}
              <a
                href={props.user?.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                {props.user?.display_name}
              </a>
            </SignedIn>
          </PersonalizedMenu>
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
            /
            <div
              style={{ marginLeft: "10px" }}
              onClick={() => toggleType("tracks")}
            >
              {" "}
              Tracks{" "}
            </div>
          </TypeToggle>
          <TimeToggle>
            <TimeToggleText onClick={() => toggleTime("shortterm")}>
              Short term
            </TimeToggleText>
            <TimeToggleText onClick={() => toggleTime("medterm")}>
              Medium term
            </TimeToggleText>
            <TimeToggleText onClick={() => toggleTime("longterm")}>
              Long term
            </TimeToggleText>
          </TimeToggle>
        </ParagraphText>
      </OuterWrapper>
    </>
  );
};
