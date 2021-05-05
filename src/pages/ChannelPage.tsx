import React, { FC, useEffect, useState, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserCode, setJoin, setUid, setClient } from "../stores/sessionStore";
import type { WebStore } from "../stores/configure";
import isNil from "lodash/isNil";
import styled from "styled-components";
import Card, { CardProps } from "../components/card";
import { nanoid } from "nanoid";
import { WebRoute } from "../route";
import WrapperPage from "./WrapperPage";
import ChatBoard from "../components/chatboard";


const StyledSection = styled.section`
`;

const StyledContentsArticle = styled.article<{
}>`
  display: flex;
  flex-wrap: wrap;
`;

const StyledChatArticle = styled.article<{
  isFolded?: boolean;
  isVisible?: boolean;
}>`
  display: ${({ isVisible }) => isVisible ? "auto" : "none"};
  
`;

interface ChannelPageProps extends RouteComponentProps {
  route: WebRoute;
}

const ids = [nanoid(20), nanoid(20), nanoid(20)];


interface DummyProps extends Array<Omit<CardProps, "onClick">> { }

const dummy: DummyProps = [
  {
    title: "클럽하우스1",
    description: "클럽하우스1 참여하시는 분들 환영합니다.",
    imageUrl: "",
    id: ids[0]
  },
  {
    title: "클럽하우스2",
    description: "클럽하우스2 참여하시는 분들 환영합니다.",
    imageUrl: "",
    id: ids[1],
  },
  {
    title: "클럽하우스3",
    description: "클럽하우스3 참여하시는 분들 환영합니다.",
    imageUrl: "",
    id: ids[2],
  }
]

const ChannelPage: FC<ChannelPageProps> = ({
  route,
  history,
}) => {
  const [authState,] = useState(() => localStorage.getItem("sampleAuth"));
  const [cardList, setCardList] = useState<DummyProps>([] as DummyProps);
  const { uid, client } = useSelector((state: WebStore) => state.session);
  const room = useSelector((state: WebStore) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    new Promise<DummyProps>((resolve) => {
      setTimeout(() => {
        resolve(dummy)
      }, 500);
    }).then((result) => {
      setCardList(result)
    });
  }, []);

  const handleClickCard = (id: string) => {
    history.push(`/room/${id}`);
  }

  const renderCardList = () => {
    return cardList.map(({ title, description, imageUrl, id }, index) => {
      return (
        <Card
          onClick={() => handleClickCard(id)}
          id={id}
          title={title}
          description={description}
          imageUrl={imageUrl}
          key={`$::${index}`}
        />
      )
    })
  }

  const handleRender = () => {
    return (
      <StyledSection>
        <StyledContentsArticle>
          {renderCardList()}
        </StyledContentsArticle>
      </StyledSection>
    );
  }

  return <WrapperPage route={route} onRender={handleRender} />
};

export default ChannelPage;