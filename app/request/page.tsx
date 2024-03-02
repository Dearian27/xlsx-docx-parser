"use client";
import React, { ChangeEvent, useState } from "react";
import axiosPL from "@/utils/axiosPL";
import "./styles.scss";
import Documents from "@/components/Documents";
import axios from "axios";

async function sha512(str: string) {
  return crypto.subtle
    .digest("SHA-512", new TextEncoder().encode(str))
    .then((buf) => {
      return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    });
}

// const client_id = "3c28ad80-7b79-4601-9f4c-9ccfa66a0df9";
const client_id = "66d1ac7f-c794-4c2b-93d4-e83d1cdff5b9";
// const redirect_uri = "Some2";
// const secret = "MmQ2ZWIwMjAtY2QyNS00MzJkLWE2NDItYmUzYzU0YjUzMGY5";
const secret = "MjNiZTcyZGQtYzRjNS00ZjM4LWFmODAtOTgyNWZkYjg0YmMy";

const Request = () => {
  const [inputValue, setInputValue] = useState("");
  const [documents, setDocuments] = useState([]);
  const [token, setToken] = useState("");

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
      const client_secret = await sha512(`${client_id}${secret}${code}`);

      const res2 = await axiosPL.post(
        "https://paperless.com.ua/PplsService/oauth/token",
        {
          grant_type: "authorization_code",
          client_id: client_id,
          client_secret: client_secret,
          code: code,
        }
      );
      const access_token = res2.data?.access_token;
      setToken(access_token);
      const refresh_token = res2.data?.refresh_token;
    } catch (err) {
      console.log("erroR");
      // console.log(err);
    }

    console.log("searchDocuments");
    try {
      const cookieHeader = `sessionId="Bearer ${token}, Id ${client_id}"`;
      const res = await axios.post(
        "https://paperless.com.ua/api2/checked/resource/search",
        { searchQuery: "", author: "all" },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
            Cookie: cookieHeader,
          },
          withCredentials: true, // Дозволяє передавати куки
        }
      );
      console.log(res);
    } catch (err) {
      console.log("erroR");
      console.log(err);
    }
  };
  createRequest();

  // const searchDocuments = async () => {
  //   console.log("searchDocuments");
  //   try {
  //     const cookieHeader = `sessionId="Bearer ${token}, Id ${client_id}"`;
  //     const res = await axios.post(
  //       "https://paperless.com.ua/api2/checked/resource/search",
  //       { searchQuery: "", author: "all" },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json; charset=UTF-8",
  //           Cookie: cookieHeader,
  //         },
  //         withCredentials: true, // Дозволяє передавати куки
  //       }
  //     );
  //     console.log(res);
  //   } catch (err) {
  //     console.log("erroR");
  //     console.log(err);
  //   }
  // };

  return (
    <div className="documents">
      <h1>Hello</h1>
      <input
        type="text"
        placeholder="search"
        value={inputValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setInputValue(event.target.value);
        }}
      />
      {/* <button onClick={searchDocuments}>Hello</button> */}
      {/* <Documents documents={documents} searchDocuments={searchDocuments} /> */}
    </div>
  );
};

export default Request;
