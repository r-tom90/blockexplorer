import { useState } from "react";
import { Copy, Tick } from "../assets";

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

  /**
   * Copies text to the user's clipboard
   *
   * @param {string} text - The text to be copied
   */
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(false), 3000);
    } catch (error) {
      console.error("Failed to copy: ", error);
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
        <img
          src={copiedText === text ? Tick : Copy}
          className="hover:outline-activeDark "
          alt="copy to clipboard"
        />
      </button>
    </>
  );
};

export default CopyToClipboard;
