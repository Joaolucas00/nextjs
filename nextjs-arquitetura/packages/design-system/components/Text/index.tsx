import styled from 'styled-components'
import React from 'react'

const StyledText = styled.span`
  font-family: sans-serif;
`
interface TextProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'
  children: React.ReactNode
}

export const Text = ({ tag, children, ...props}: TextProps) => {
  return (
    <StyledText as={tag} {...props}>
      { children }
    </StyledText>
  )
}
