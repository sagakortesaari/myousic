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

const PersonalizedMenu = styled.div`
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
        </ParagraphText>
      </OuterWrapper>
    </>
  );
};
