"use client"
    import { CodeToggle } from '@/components/ui/code-toggle'
    import { useState } from 'react'
    import { transpileTypeScript } from '@/lib/transpile'

    const initialTsCode = `interface User {
      name: string;
      age: number;
    }

    function greet(user: User): string {
      return \`Hello, \${user.name}!\`;
    }`

    const initialJsCode = transpileTypeScript(initialTsCode)

    export default function Home() {
      const [tsCode, setTsCode] = useState(initialTsCode)
      const [jsCode, setJsCode] = useState(initialJsCode)

      const handleCodeChange = (newCode: string, language: 'ts' | 'js') => {
        if (language === 'ts') {
          const transpiled = transpileTypeScript(newCode)
          setTsCode(newCode)
          setJsCode(transpiled)
        } else {
          setJsCode(newCode)
        }
      }

      return (
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h1 className="text-2xl font-bold mb-4">TypeScript to JavaScript Converter</h1>
          <CodeToggle 
            tsCode={tsCode} 
            jsCode={jsCode} 
            onCodeChange={handleCodeChange}
          />
        </div>
      )
    }
