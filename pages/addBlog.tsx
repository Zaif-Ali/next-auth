import TextEditor from "@/components/RTE/TextEditor";
import useBlog from "@/hooks/useBlog";
import Wrapper from "@/layout/Wrapper";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {}

const AddBlog: NextPage<Props> = ({}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [IsSubmit, setIsSubmit] = useState(false);
  const { addBlog, loading } = useBlog();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmit(true);

    if (
      title.length < 4 ||
      content.trim() === "" ||
      content.split(" ").filter(Boolean).length < 5
    ) {
      toast.error("Title have min 4 and content must have at least 5 words");
      setIsSubmit(false);
      return;
    }

    let cleanedContent = content.replace(/\s+/g, " ").trim();
    cleanedContent = cleanedContent.replace(/(<br\s*\/?>){3,}/g, "<br><br>");

    await addBlog(title, content);

    setContent("");
    setTitle("");

    setIsSubmit(false);
  };

  return (
    <Wrapper>
            <Head>
        <title>{` Add New Blogs || Final-Blog `}</title>
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={`Meta description for the Add New Blog Page`}
        />
      </Head>
      <div>
        <div className="pb-3">
          <label
            htmlFor="image"
            className="block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-300"
          >
            Title
          </label>
          {/* Title input  */}
          <input
            type="text"
            pattern="[A-Za-z]+\s[A-Za-z]+\s[A-Za-z]+\s[A-Za-z].*"
            id="Title"
            title="Please enter at least four letters"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title of the Blog"
            required
          />
        </div>
        <TextEditor content={content} setContent={setContent} />

        <div className=" mt-20 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-purple-700 text-gray-300 font-semibold px-4 py-1 rounded-md disabled:opacity-30 "
            id="SubmitedBlock"
            disabled={IsSubmit ? true : false}
          >
            {loading ? "loading.." : "Submit"}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddBlog;
