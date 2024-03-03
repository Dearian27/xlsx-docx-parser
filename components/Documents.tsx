"use client";
import React from "react";

const Documents = ({ docs }) => {
  console.log(docs[0]);
  return (
    <>
      <div style={{ color: "#4c4cff", fontSize: 30 }}>{docs.length}</div>
      <div style={{ color: "#4c4cff", fontSize: 30 }}>
        {docs?.[0]?.toString()}
      </div>
      {/* <button onClick={searchDocuments}>Find</button> */}
      <div className="list">
        <a href="#" className="doc">
          Document
        </a>
      </div>
    </>
  );
};

export default Documents;
