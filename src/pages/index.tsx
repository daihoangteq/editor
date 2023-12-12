import { Inter } from "next/font/google";
import { useState } from "react";
import EazyEditor from "@/components/CkEditor";
import MarkdownEditor from "@/components/Markdown";

export default function Home() {
  const [img, setImg] = useState<null | File>(null);
  const [mode, setMode] = useState<"classic" | "markdown">("classic");
  const handleSubmit = () => {
    if (!img) return;
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "demoupload");
    formData.append("cloud_name", "dfnpcxlkn");

    const url = "https://api.cloudinary.com/v1_1/dfnpcxlkn/image/upload";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data.url))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <MarkdownEditor />
    </div>
  );
}
