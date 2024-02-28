"use client";
// import WebViewer from "@pdftron/webviewer";
import { useEffect, useRef } from "react";

export default function WebEditor() {
  const viewerRef = useRef(null);

  useEffect(() => {
    import("@pdftron/webviewer").then(() => {
      WebViewer(
        {
          path: "/lib",
          licenseKey:
            "demo:1709130283337:7f2d119603000000008a0fe794dfb391c134f038f8e153bf72e0d84c53", // sign up to get a key at https://dev.apryse.com
          initialDoc:
            "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
        },
        viewerRef.current
      ).then((instance) => {
        const { docViewer } = instance;
        // you can now call WebViewer APIs here...
      });
    });
  }, []);

  return (
    <div
      className="webviewer"
      ref={viewerRef}
      style={{ height: "100vh", width: "50vw" }}
    />
  );
}
