import styled from "styled-components";
import { User } from "../types";

const OuterWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const Menu = styled.div`
  width: 80%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  flex-direction: column;
  align-items: center;

  & > img {
    border-radius: 50%;
    margin-bottom: 20px;
  }
`;

const SignedIn = styled.div``;

const TypeToggle = styled.div`
  display: flex;
  font-size: 20pt;
`;

const TimeToggle = styled.div`
  display: flex;
`;

const ShortTerm = styled.div<{ term: string }>`
  margin-right: 10px;
  color: ${(props) => (props.term === "shortterm" ? "#aad0a8" : "black")};

  &:hover {
    cursor: pointer;
  }
`;

const MediumTerm = styled.div<{ term: string }>`
  margin-right: 10px;
  color: ${(props) => (props.term === "medterm" ? "#aad0a8" : "black")};

  &:hover {
    cursor: pointer;
  }
`;

const LongTerm = styled.div<{ term: string }>`
  margin-right: 10px;
  color: ${(props) => (props.term === "longterm" ? "#aad0a8" : "black")};

  &:hover {
    cursor: pointer;
  }
`;

const ArtistsText = styled.div<{ selected: string }>`
  margin-right: 10px;
  color: ${(props) => (props.selected === "artists" ? "#aad0a8" : "black")};

  &:hover {
    cursor: pointer;
  }
`;

const TrackText = styled.div<{ selected: string }>`
  margin-left: 10px;
  color: ${(props) => (props.selected === "tracks" ? "#aad0a8" : "black")};

  &:hover {
    cursor: pointer;
  }
`;

type StatPageMenuProps = {
  user: User | undefined;
  toggle: any;
  toggleTime: any;
  displayType: string;
  termType: string;
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
        <Menu>
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
              <ArtistsText
                selected={props.displayType}
                onClick={() => toggleType("artists")}
              >
                {" "}
                Top Artists{" "}
              </ArtistsText>
              /
              <TrackText
                selected={props.displayType}
                onClick={() => toggleType("tracks")}
              >
                {" "}
                Top Tracks{" "}
              </TrackText>
            </TypeToggle>
            <TimeToggle>
              <ShortTerm
                onClick={() => toggleTime("shortterm")}
                term={props.termType}
              >
                Past 4 weeks
              </ShortTerm>
              <MediumTerm
                onClick={() => toggleTime("medterm")}
                term={props.termType}
              >
                Past 6 months
              </MediumTerm>
              <LongTerm
                onClick={() => toggleTime("longterm")}
                term={props.termType}
              >
                All time
              </LongTerm>
            </TimeToggle>
          </ParagraphText>
        </Menu>
      </OuterWrapper>
    </>
  );
};
