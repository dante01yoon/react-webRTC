import React, { FC } from "react";

interface ErrorPageProps {
  status?: number | string;
}

const ErrorPage: FC<ErrorPageProps> = ({
  status = 404,
}) => {
  return (
    <>{status}에러가 발생했습니다.</>
  )
}

export default ErrorPage;