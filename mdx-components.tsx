import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-semibold text-stone-900 tracking-tight mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl md:text-2xl font-semibold text-stone-800 tracking-tight mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-stone-800 mt-6 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base text-stone-600 leading-relaxed mb-4 max-w-[65ch]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 text-stone-600 mb-6 ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 text-stone-600 mb-6 ml-4">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-base leading-relaxed">
      {children}
    </li>
  ),
  a: ({ href, children }) => (
    <a 
      href={href} 
      className="text-rose-600 hover:text-rose-700 underline underline-offset-2 transition-colors duration-200"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-stone-800">
      {children}
    </strong>
  ),
  hr: () => (
    <hr className="border-stone-200 my-8" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm text-left text-stone-600 border border-stone-200 rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="text-xs text-stone-700 uppercase bg-stone-100">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 border-t border-stone-200">
      {children}
    </td>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-stone-50/50 transition-colors">
      {children}
    </tr>
  ),
  tbody: ({ children }) => (
    <tbody>
      {children}
    </tbody>
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
