export const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2 , 3, 4 , 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["code-block"],
        ["clean"],
        [{ multiLine: true }], // add this line to enable line breaks
        
      ],
       
    },
    
  };
  
  export const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "code-block",
    
  ];
  
  
  export const sanitizeOptions = {
    allowedTags: [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "pre",
      "strong",
      "em",
      "u",
      "strike",
      "a",
      "ul",
      "ol",
      "li",
      "br",
      "code-block",
    ],
    allowedAttributes: {
      a: ["href", "target"],
      img: ["src", "alt"],
    },
    allowedSchemes: ["http", "https", "ftp", "mailto"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    allowProtocolRelative: true,
    transformTags: {
      b: "strong",
      i: "em",
      s: "strike",
      u: "u",
    },
    whitelist: {
      br: true,
      span: true,
      pre: true,
      code: true,
    },
   
  }