import * as ts from 'typescript';

    export function transpileTypeScript(code: string): string {
      try {
        const result = ts.transpileModule(code, {
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ESNext,
            removeComments: false,
            preserveConstEnums: true,
            strict: true
          }
        });
        return result.outputText;
      } catch (error) {
        console.error('Transpilation error:', error);
        return '// Error transpiling TypeScript';
      }
    }
