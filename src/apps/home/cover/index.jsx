import React from 'react'
import CoverDefault from './Defult';
import LoadBody from "../media/LoadBody";

export default function Cover({
  theme = null
}) {
  if (theme !== null) {
    return <LoadBody theme={theme}/>
  }
  return (
    <CoverDefault />
  )
}
