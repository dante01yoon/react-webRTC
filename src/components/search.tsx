import React, { FC, useState, useCallback } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";

const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bg_search};
  width: 400px;
  height: 35px;
  border-radius: 8px;
  padding: 4px 10px;
`;

const StyledInput = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary_text};
  font-size: 12px;
  line-height: 30px;
  width: 100%;
  height: 30px;
`;

const Search: FC = ({ }) => {
  const [inputText, setInputText] = useState("");

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
        value={inputText}
        placeholder={"Search for rooms, users or categories"}
        onChange={handleChange}
      />
    </StyledWrapper>
  )
}

export default Search;