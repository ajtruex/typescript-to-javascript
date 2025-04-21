import React, { useState } from "react";

/**
 * Props for the CodeToggle component.
 * - tsCode: The TypeScript version of the code snippet.
 * - jsCode: The JavaScript version of the code snippet.
 * - languageLabel (optional): Custom label for languages.
 */
interface CodeToggleProps {
  tsCode: string;
  jsCode: string;
  languageLabel?: { ts?: string; js?: string };
}

/**
 * CodeToggle Component
 *
 * Renders a toggle UI to switch between TypeScript and JavaScript code snippets.
 * Usage:
 *   <CodeToggle tsCode={`const a: number = 5;`} jsCode={`const a = 5;`} />
 */
const CodeToggle: React.FC<CodeToggleProps> = ({
  tsCode,
  jsCode,
  languageLabel = { ts: "TypeScript", js: "JavaScript" },
}) => {
  const [showTS, setShowTS] = useState(true);

  return (
    <div className="w-full max-w-2xl my-4">
      <div className="flex space-x-2 mb-2">
        <button
          className={`px-4 py-1 rounded-t-lg focus:outline-none transition font-mono text-sm
            ${showTS
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
          onClick={() => setShowTS(true)}
          aria-label={`Show ${languageLabel.ts}`}
        >
          {languageLabel.ts}
        </button>
        <button
          className={`px-4 py-1 rounded-t-lg focus:outline-none transition font-mono text-sm
            ${!showTS
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
          onClick={() => setShowTS(false)}
          aria-label={`Show ${languageLabel.js}`}
        >
          {languageLabel.js}
        </button>
      </div>
      <pre className="bg-gray-900 rounded-b-lg rounded-tr-lg text-sm overflow-x-auto p-4 text-white min-h-[80px]">
        <code className="language-typescript" aria-label={showTS ? "TypeScript code snippet" : "JavaScript code snippet"}>
          {showTS ? tsCode : jsCode}
        </code>
      </pre>
    </div>
  );
};

export default CodeToggle;