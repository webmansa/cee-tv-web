import classNames from 'classnames';
import React from 'react'

interface TitleComponentProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string;
}


export const Title: React.FC<TitleComponentProps> = ({ text, ...props }) => (
    <h2 className={classNames("mb-4 font-medium text-xl", `${props.className}`)} {...props}>{text}</h2>
)
