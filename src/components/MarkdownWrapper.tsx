import { classNames } from '@/lib/util'
import { FC } from 'react'
import Markdown, { Options } from 'react-markdown'

interface Props extends Readonly<Options> {}

export const MarkdownWrapper: FC<Props> = (props) => {
  const removeTopMargin = 'first:prose-p:mt-0 first:prose-h2:mt-0'
  const customSpacing = 'prose-h2:mt-8'
  return (
    <Markdown
      className={classNames('prose', removeTopMargin, customSpacing)}
      {...props}
    />
  )
}
