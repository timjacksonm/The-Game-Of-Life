import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  HiOutlineClipboardCopy,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';

function Copytext({ text, clipboard, setClipboard }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setClipboard(text);
  };
  return (
    <div className="flex items-center px-3">
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <input
          defaultValue={text}
          className="text-black p-1 my-3 cursor-pointer"
          readOnly
        />
      </CopyToClipboard>
      {copied && clipboard === text ? (
        <HiOutlineClipboardCheck size="2em" color="limegreen" />
      ) : (
        <HiOutlineClipboardCopy size="2em" />
      )}
      {copied && clipboard === text && <p>Copied!</p>}
    </div>
  );
}

export default Copytext;
