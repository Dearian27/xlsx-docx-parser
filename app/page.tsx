"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import { Document, Packer, Paragraph, TextRun } from "docx";
import docx from "docx";
import { saveAs } from "file-saver";

import * as xlsx from "xlsx/xlsx.mjs";

import { ReactNode, useRef, useState } from "react";
import WebEditor from "@/components/WebEditor";

const fakeJSONData = [
  {
    id: 1,
    name: "James",
    country: "United States",
  },
  {
    id: 2,
    name: "John",
    country: "Canada",
  },
  {
    id: 3,
    name: "Jessy",
    country: "Australia",
  },
  {
    id: 4,
    name: "Jane",
    country: "England",
  },
];

export default function Home() {
  const [xlsxFile, setXlsxFile] = useState<any>(null);
  const [jsonObject, setJsonObject] = useState<any>();
  const inputXLSXRef = useRef(null);

  const xlsxToJSON = () => {
    const reader = new FileReader();
    reader.readAsBinaryString(inputXLSXRef.current!.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = xlsx.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = xlsx.utils.sheet_to_json(sheet);
      setJsonObject(parsedData);
    };
  };

  const parseDOCX = () => {
    for (let i = 0; i < jsonObject.length; i++) {
      setTimeout(() => {
        const sections = [
          {
            children: [
              new Paragraph({
                children: [new TextRun({ text: `${jsonObject[i]["id"]}` })],
              }),
              new Paragraph({
                children: [new TextRun({ text: `${jsonObject[i]["name"]}` })],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: `${jsonObject[i]["country"]}` }),
                ],
              }),
            ],
          },
        ];
        const doc = new Document({
          sections: [...sections],
          creator: "Вчасно",
        });

        saveDocumentToFile(
          doc,
          `${jsonObject[i]["name"]}${jsonObject[i]["id"]}.docx`
        );
      }, 1000);
    }
  };

  const saveDocumentToFile = (doc, filename) => {
    const mimeType =
      "application/vnd.openxmlformats-officedocument.wordprocessing";
    Packer.toBlob(doc).then((blob) => {
      const docblob = blob.slice(0, blob.size, mimeType);
      saveAs(docblob, filename);
    });
  };

  return (
    <main className={styles.main}>
      <section className={styles.excelPanel}>
        <input
          type="file"
          ref={inputXLSXRef}
          onChange={(event) => {
            xlsxToJSON();
          }}
          accept=".xls,.xlsx"
        />

        <h1>
          You have{" "}
          <span className={styles.count}>{jsonObject?.length || 0}</span>{" "}
          Accounts.
        </h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          <tbody>
            {jsonObject?.map((data, index) => {
              return (
                <tr key={index}>
                  {Object.entries(data).map((entry: any, index2) => {
                    return (
                      <th key={index + index2} scope="col">
                        {entry[1]}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className={styles.button} onClick={parseDOCX}>
          Download DOCX
        </button>
      </section>
      <section className={styles.docsPanel}>
        <WebEditor />
      </section>
    </main>
  );
}
