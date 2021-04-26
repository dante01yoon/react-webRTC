import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps, withRouter, Redirect } from "react-router-dom";
import isNil from "lodash/isNil";
import { WebStore } from "../stores";
import { WebRoute } from "../route";
import { setUserCode, setClient } from "../stores/sessionStore";
import AgoraRTCClient from "../utils/rtc"

interface WrapperPageProps extends RouteComponentProps {
  onRender: () => React.ReactNode;
  route: WebRoute;
}

const WrapperPage: FC<WrapperPageProps> = ({ route, onRender }) => {
  const state = useSelector((state: WebStore) => state);
  const { session } = state;
  const { authed } = route;
  const dispatch = useDispatch();

  if (authed) {
    // 세션 확인 
    if (!session.userCode) {
      const sessionCode = localStorage.getItem("sampleAuth");
      if (isNil(sessionCode)) {
        return <Redirect to="/" />
      }
      else {
        dispatch(setUserCode({ userCode: sessionCode }));
      }
    }
    // rtc client 초기화
    if (isNil(session.client)) {
      const agoraClient = new AgoraRTCClient();
      dispatch(setClient({ client: agoraClient }));
    }
  }

  return (
    <>
      {onRender()}
    </>
  )
};

export default withRouter(WrapperPage);