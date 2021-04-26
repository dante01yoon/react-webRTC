import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import background from "../assets/images/background.png";

const StyledWrapper = styled.div`
  cursor: pointer;
  margin-right: 30px;
`;

const StyledImageBox = styled.div<{
  imageUrl: string;
}>`
  background: url(${({ imageUrl }) => imageUrl}) center / cover no-repeat;
  width: 240px;
  height: 120px;
`;


const StyledTextContainer = styled.div`
  padding-top: 10px;
  width: 240px;
`;

const StyledTitleText = styled.div`
  color: ${({ theme }) => theme.colors.primary_text};
  letter-spacing: -0.4px;
  line-height: 26px;
  font-size: 20px;
`;

const StyledDescriptionText = styled.div`
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -0.4px;
`;

export interface CardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  onClick: () => void;
}

const Card: FC<CardProps> = ({
  id,
  title,
  description,
  onClick,
  imageUrl = background,
}) => {

  const handleClick = () => {
    onClick();
  }

  return (
    <StyledWrapper onClick={handleClick}>
      <StyledImageBox imageUrl={background} />
      <StyledTextContainer>
        <StyledTitleText>{title}</StyledTitleText>
        <StyledDescriptionText>{description}</StyledDescriptionText>
      </StyledTextContainer>
    </StyledWrapper>
  )
}

export default Card;