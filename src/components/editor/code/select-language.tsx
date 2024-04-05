'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Fira_Code } from 'next/font/google';
const fira = Fira_Code({ subsets: ['latin'] });

type Props = {
  selectedLanguage: string;
  handleSelectedLanguage: (value: string) => void;
};

export function SelectLanguage({
  selectedLanguage,
  handleSelectedLanguage,
}: Props) {
  return (
    <Select
      onValueChange={(value) => handleSelectedLanguage(value)}
      defaultValue='javascript'
      value={selectedLanguage}
    >
      <SelectTrigger className={cn(fira.className, 'w-[180px]')}>
        <SelectValue
          placeholder='Select a language'
          className={cn(fira.className)}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className={cn(fira.className)}>Languages</SelectLabel>
          {LANGUAGES.map((language) => (
            <SelectItem
              key={language.value}
              value={language.value}
              className={cn(fira.className)}
            >
              {language.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const LANGUAGES = [
  { name: 'ABAP', value: 'abap' },
  { name: 'AES', value: 'aes' },
  { name: 'Apex', value: 'apex' },
  { name: 'Azure CLI', value: 'azcli' },
  { name: 'Batch', value: 'bat' },
  { name: 'Bicep', value: 'bicep' },
  { name: 'Brainfuck', value: 'brainfuck' },
  { name: 'C', value: 'c' },
  { name: 'CameLIGO', value: 'cameligo' },
  { name: 'C-like', value: 'clike' },
  { name: 'Clojure', value: 'clojure' },
  { name: 'CoffeeScript', value: 'coffeescript' },
  { name: 'C++', value: 'cpp' },
  { name: 'C#', value: 'csharp' },
  { name: 'CSP', value: 'csp' },
  { name: 'CSS', value: 'css' },
  { name: 'Dart', value: 'dart' },
  { name: 'Dockerfile', value: 'dockerfile' },
  { name: 'ECL', value: 'ecl' },
  { name: 'Elixir', value: 'elixir' },
  { name: 'Erlang', value: 'erlang' },
  { name: 'Flow9', value: 'flow9' },
  { name: 'FreeMarker2', value: 'freemarker2' },
  { name: 'F#', value: 'fsharp' },
  { name: 'Go', value: 'go' },
  { name: 'GraphQL', value: 'graphql' },
  { name: 'Handlebars', value: 'handlebars' },
  { name: 'HCL', value: 'hcl' },
  { name: 'HTML', value: 'html' },
  { name: 'INI', value: 'ini' },
  { name: 'Java', value: 'java' },
  { name: 'JavaScript', value: 'javascript' },
  { name: 'JSON', value: 'json' },
  { name: 'JSX', value: 'jsx' },
  { name: 'Julia', value: 'julia' },
  { name: 'Kotlin', value: 'kotlin' },
  { name: 'Less', value: 'less' },
  { name: 'Lex', value: 'lex' },
  { name: 'Lexon', value: 'lexon' },
  { name: 'Liquid', value: 'liquid' },
  { name: 'LiveScript', value: 'livescript' },
  { name: 'Lua', value: 'lua' },
  { name: 'M3', value: 'm3' },
  { name: 'Markdown', value: 'markdown' },
  { name: 'MIPS', value: 'mips' },
  { name: 'MSDAX', value: 'msdax' },
  { name: 'MySQL', value: 'mysql' },
  { name: 'NGINX', value: 'nginx' },
  { name: 'Objective-C', value: 'objective-c' },
  { name: 'Pascal', value: 'pascal' },
  { name: 'Pascaligo', value: 'pascaligo' },
  { name: 'Perl', value: 'perl' },
  { name: 'PostgreSQL', value: 'pgsql' },
  { name: 'PHP', value: 'php' },
  { name: 'PLA', value: 'pla' },
  { name: 'Plain Text', value: 'plaintext' },
  { name: 'Postiats', value: 'postiats' },
  { name: 'Power Query', value: 'powerquery' },
  { name: 'PowerShell', value: 'powershell' },
  { name: 'Proto', value: 'proto' },
  { name: 'Pug', value: 'pug' },
  { name: 'Python', value: 'python' },
  { name: 'Q#', value: 'qsharp' },
  { name: 'R', value: 'r' },
  { name: 'Razor', value: 'razor' },
  { name: 'Redis', value: 'redis' },
  { name: 'Redshift', value: 'redshift' },
  { name: 'Restructured Text', value: 'restructuredtext' },
  { name: 'Ruby', value: 'ruby' },
  { name: 'Rust', value: 'rust' },
  { name: 'SB', value: 'sb' },
  { name: 'Scala', value: 'scala' },
  { name: 'Scheme', value: 'scheme' },
  { name: 'SCSS', value: 'scss' },
  { name: 'Shell', value: 'shell' },
  { name: 'SOL', value: 'sol' },
  { name: 'SPARQL', value: 'sparql' },
  { name: 'SQL', value: 'sql' },
  { name: 'ST', value: 'st' },
  { name: 'Stylus', value: 'stylus' },
  { name: 'Swift', value: 'swift' },
  { name: 'SystemVerilog', value: 'systemverilog' },
  { name: 'TCL', value: 'tcl' },
  { name: 'TOML', value: 'toml' },
  { name: 'TSX', value: 'tsx' },
  { name: 'Twig', value: 'twig' },
  { name: 'TypeScript', value: 'typescript' },
  { name: 'VB', value: 'vb' },
  { name: 'VBScript', value: 'vbscript' },
  { name: 'Verilog', value: 'verilog' },
  { name: 'Vue', value: 'vue' },
  { name: 'XML', value: 'xml' },
  { name: 'YAML', value: 'yaml' },
];
