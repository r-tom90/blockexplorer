import { useState } from "react";
import { IoMdCopy } from "react-icons/io";

/**
 * A React component that creates a button to copy a given text to clipboard
 *
 * @param {Object} props - React props object
 * @param {string} props.text - The text to be copied to clipboard
 * @return {JSX.Element} A button that copies the text to clipboard when clicked.
 */
const CopyToClipboard = ({ text }) => {
  // State for keeping track of copied text
  const [copiedText, setCopiedText] = useState("");

  // Function to copy text to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Render button and handle click event
  return (
    <>
      <button
        // Button styles
        className="text-transactionGray hover:text-activeLight"
        // Handle click event to copy text to clipboard
        onClick={() => copyToClipboard(text)}
      >
        <IoMdCopy />
      </button>
      {/* Display message when text is copied */}
      {/* {copiedText === text &&
          console.log(`Copied "${copiedText}" to clipboard!`)} */}
    </>
  );
};

export default CopyToClipboard;
