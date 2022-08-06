import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

const Redirect: FC<{ to: string }> = ({ to }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, []);
  return null;
};

export default Redirect;
