import React, { FC, useState, useCallback } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import search from "../assets/images/search.svg";

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bg_search};
  width: 400px;
  height: 35px;
  border-radius: 8px;
  padding: 4px 10px;
`;

const StyledInput = styled.input<{
  isSearchVisible?: boolean;
}>`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary_text};
  font-size: 12px;
  line-height: 30px;
  width: 100%;
  height: 30px;
  
  &::before {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    background-image: url(${search});
    background-size: cover;
    background-repeat: no-repeat;
  }

  :focus {
    &::before {
      display: none;
    }
  }
`;

const Search: FC = ({ }) => {
  const [inputText, setInputText] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
    searchHandler(e.target.value)
  }, [])

  const searchHandler = throttle((searchText: string) => {
    console.log("inputText: ", searchText);
  }, 300);

  return (
    <StyledWrapper>
      <StyledInput
        // isSearchVisible={isSearchVisible}
        value={inputText}
        placeholder={"Search for rooms, users or categories"}
        onChange={handleChange}
      />
    </StyledWrapper>
  )
}

export default Search;