import React from "react";
import { createRequest } from "./action";
import axiosPL from "@/utils/axiosPL";

async function sha512(str: string) {
  return crypto.subtle
    .digest("SHA-512", new TextEncoder().encode(str))
    .then((buf) => {
      return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    });
}

const Request = async () => {
  // await createRequest();
  // const client_id = "3c28ad80-7b79-4601-9f4c-9ccfa66a0df9";
  const client_id = "66d1ac7f-c794-4c2b-93d4-e83d1cdff5b9";
  const redirect_uri = "Some2";
  // const secret = "MmQ2ZWIwMjAtY2QyNS00MzJkLWE2NDItYmUzYzU0YjUzMGY5";
  const secret = "MjNiZTcyZGQtYzRjNS00ZjM4LWFmODAtOTgyNWZkYjg0YmMy";

  const createRequest = async () => {
    try {
      const res = await axiosPL.post(
        // "https://paperless.com.ua/PplsService/oauth/authorize",
        `https://paperless.com.ua/PplsService/oauth/authorize`,
        {
          response_type: "code",
          agentCheck: true,
          client_id: client_id,
          // secret: secret,
        }
      );
      const code = res.data.code;
      console.log("code: ", res.data.code);

      const client_secret = await sha512(`${client_id}${secret}${code}`);
      console.log("sha512 client_secret: ", client_secret);

      const res2 = await axiosPL.post(
        "https://paperless.com.ua/PplsService/oauth/token",
        {
          grant_type: "authorization_code",
          client_id: client_id,
          client_secret: client_secret,
          code: code,
        }
      );
      console.log(res2.status);
      const access_token = res2.data?.access_token;
      const refresh_token = res2.data?.refresh_token;
      console.log("access_token: ", access_token);
      console.log("refresh_token: ", refresh_token);
    } catch (err) {
      console.log("erroR");
      console.log(err);
    }
  };
  createRequest();

  return <div>Hello</div>;
};

export default Request;
