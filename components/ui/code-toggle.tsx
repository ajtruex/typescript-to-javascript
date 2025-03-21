'use client'

    import * as React from 'react'
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
    import { cn } from '@/lib/utils'
    import { Highlight, themes } from 'prism-react-renderer'

    interface CodeToggleProps {
      tsCode: string
      jsCode: string
      className?: string
      onCodeChange?: (code: string, language: 'ts' | 'js') => void
    }

    export function CodeToggle({ tsCode, jsCode, className, onCodeChange }: CodeToggleProps) {
      const [language, setLanguage] = React.useState<'ts' | 'js'>('ts')
      const [code, setCode] = React.useState(language === 'ts' ? tsCode : jsCode)
      const preRef = React.useRef<HTMLPreElement>(null)

      React.useEffect(() => {
        setCode(language === 'ts' ? tsCode : jsCode)
      }, [language, tsCode, jsCode])

      const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
        const newCode = event.currentTarget.textContent || ''
        setCode(newCode)
        onCodeChange?.(newCode, language)
      }

      return (
        <div className={cn('flex flex-col gap-2', className)}>
          <div className="flex justify-end">
            <Select value={language} onValueChange={(value: 'ts' | 'js') => setLanguage(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ts">TypeScript</SelectItem>
                <SelectItem value="js">JavaScript</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md bg-[#2d2d2d] p-4">
            <Highlight
              theme={themes.vsDark}
              code={code}
              language={language}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre 
                  style={style} 
                  className={cn('overflow-x-auto', className)}
                  ref={preRef}
                >
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput}
                    className="outline-none"
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </div>
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      )
    }
