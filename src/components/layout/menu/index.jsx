import React from 'react'
import Desktop from './Desktop';
import Movil from './Movil';
import {isMobile} from 'react-device-detect';

export const idMenu = "rdbMenu"

export default function Menu() {
    if(isMobile){
        return <Movil />
    }
  return (
    <Desktop />
  )
}
