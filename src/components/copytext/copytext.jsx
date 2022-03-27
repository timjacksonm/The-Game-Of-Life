import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  HiOutlineClipboardCopy,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';

function Copytext({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center">
      <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
        <input
          defaultValue={text}
          className="text-black p-1 my-3 cursor-pointer"
          readOnly
        />
      </CopyToClipboard>
      {copied ? (
        <HiOutlineClipboardCheck size="2em" color="limegreen" />
      ) : (
        <HiOutlineClipboardCopy size="2em" />
      )}
      {copied && <p>Copied!</p>}
    </div>
  );
}

export default Copytext;
