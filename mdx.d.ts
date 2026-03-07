declare module '*.mdx' {
  import { ReactNode } from 'react'
  const Component: () => ReactNode
  export default Component
}
