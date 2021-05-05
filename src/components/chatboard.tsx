import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import useStores from "../utils/useStores";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoomCode, pushChatMessages, setChatMessages } from "../stores/roomStore";
import ChatCard from "./chatCard";
import { nanoid } from "nanoid";

const StyledWrapper = styled.div`
  background: ${({ theme }) => theme.colors.board_background};
  float: right;
  box-sizing: border-box;
  width: 300px;
  padding: 5px 25px;
  border-radius: 8px;
`;

const StyledScrollableArea = styled.div`
  overflow-y: auto;
  height: 730px;
`;

const StyledTextAreaWrapper = styled.div`
  position: relative;
`;

const StyledTextArea = styled.textarea`
  background-color: ${({ theme }) => theme.colors.bg_search};
  color: ${({ theme }) => theme.colors.primary_text};
  font-size: 13px;
  line-height: 15px;
  width: 100%;
  height: 30px;
  padding: 8px 10px;
  border: none;
  border-radius: 8px;
  resize: none;
`;

interface ChatBoardProps {
  onSubmit: () => void;
}

interface ChatMessage {
  roomId: string;
  message: string;
}

const ChatBoard: FC<ChatBoardProps> = ({
  onSubmit,
}) => {
  const socketRef = useRef<any>();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // StyledScrollable 이 업데이트 되면 스크롤 최하단 고정 여부
  const scrollBlock = useRef(true);
  const [textAreaInput, setTextAreaInput] = useState("");
  const colorDictRef = useRef<Record<string, string>>({});
  const textAreaInputRef = useRef(textAreaInput);
  const dispatch = useDispatch();
  const stores = useStores();
  const { id } = useParams<{ id: string }>();

  if (stores.room.roomCode !== id) {
    dispatch(setRoomCode({ roomCode: id }));
    dispatch(setChatMessages(null));
  }

  const handleSubmit = (event: React.FormEvent) => {
    const socket = socketRef.current;
    socket.emit("sendMessage", ({ roomId: id, message: textAreaInput }))
    event.preventDefault();
    setTextAreaInput("");
    if (onSubmit) {
      onSubmit();
    }
  }

  const handleScroll = React.useCallback(() => {

  }, []);

  useEffect(() => {
    socketRef.current = io("ws://localhost:5001", {
      reconnectionDelayMax: 5000,
    });
    const socket = socketRef.current;
    socket.on("connect", () => {
      // socket id 확인
      console.log("socket.id: ", socket.id);
      socket.emit("roomJoin", {
        roomId: id,
        userId: stores.session.userCode,
      })
    });

    // 서버에서 메세지 보냈을때 핸들러
    socket.on("sentMessage", ({ roomId, message }: ChatMessage) => {
      console.log("message: ", message);
      dispatch(pushChatMessages({ name: nanoid(5), message }))
    })

    // 소켓 연결해제 핸들러
    socket.on("disconnect", (reason: any) => {
      console.log("socket disconnected reason: ", reason)
    })

    return () => {
      dispatch(setChatMessages(null))
    }
  }, [])

  useEffect(() => {
    textAreaInputRef.current = textAreaInput;
  }, [textAreaInput]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaInput(event.target.value);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const socket = socketRef.current;

    if (event.key === "Enter" && event.shiftKey) {
      textAreaInputRef.current = textAreaInputRef.current + "\n";
    }
    else if (event.key === "Enter") {
      socket.emit("sendMessage", { roomId: id, message: textAreaInputRef.current })
      event.preventDefault();

      if (onSubmit) {
        onSubmit();
      }

      setTextAreaInput("");
    }
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  const renderChatMessages = () => {
    return stores.room.chatMessages?.map((chat, index) => {
      let color = "";
      const colorDict = colorDictRef.current;

      if (colorDict.hasOwnProperty(chat.name)) {
        color = colorDict[chat.name];
      }
      else {
        color = getRandomColor();
        colorDict[chat.name] = color;
      }

      return (
        <ChatCard
          color={color}
          name={chat.name}
          message={chat.message}
          key={`$::${index}`}
        />
      )
    })
  }

  useEffect(() => {
    // textarea 키다운 이벤트 핸들러
    if (textAreaRef.current) {
      textAreaRef.current.addEventListener("keydown", handleKeyDown)
    }

    // StyledScrollableArea 스크롤  핸들러
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.addEventListener("onMouseDown", (event) => {

      })

      scrollElement.addEventListener("scroll", (event) => {

        // 스크롤 최하단 고정이 안되어있는 상태에서 유저가 수동으로 스크롤을 최하단으로 내렸을 경우 다시 고정을 적용함
        if (
          !scrollBlock.current
          &&
          (scrollElement.scrollTop === (scrollElement.scrollHeight - scrollElement.offsetHeight))
        ) {
          scrollBlock.current = true;
          return false;
        }
        console.log(event);
        // 유저가 스크롤을 하면 스크롤 최하단 고정 품
        if (
          scrollBlock.current
          &&
          !(scrollElement.scrollTop === (scrollElement.scrollHeight - scrollElement.offsetHeight))
        ) {
          scrollBlock.current = false;
        }
      })
    }

    return (() => {
      if (textAreaRef.current) {
        textAreaRef.current.removeEventListener("keydown", handleKeyDown);
      }
    })
  }, [])

  useEffect(() => {
    if (scrollRef.current && scrollBlock.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [stores.room.chatMessages?.length, scrollRef.current]);

  return (
    <StyledWrapper>
      <StyledScrollableArea ref={scrollRef}>
        {renderChatMessages()}
      </StyledScrollableArea>
      <StyledTextAreaWrapper>
        <form onSubmit={handleSubmit}>
          <StyledTextArea ref={textAreaRef} onChange={handleChangeInput} value={textAreaInput} />
          <button>클릭</button>
        </form>
      </StyledTextAreaWrapper>
    </StyledWrapper>
  )
}

export default ChatBoard;