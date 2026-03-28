'use client'

import * as React from 'react'
import { NotionRenderer } from 'react-notion-x'
import { ExtendedRecordMap } from 'notion-types'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

// Core styles are required
import 'react-notion-x/src/styles.css'
// Optional styles
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
)

export function NotionPage({
  recordMap,
  fullPage = true,
  darkMode = true
}: {
  recordMap: ExtendedRecordMap
  fullPage?: boolean
  darkMode?: boolean
}) {
  if (!recordMap) {
    return null
  }

  return (
    <div className="notion-container">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={fullPage}
        darkMode={darkMode}
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Collection,
          Equation,
          Pdf,
          Modal
        }}
      />
    </div>
  )
}
