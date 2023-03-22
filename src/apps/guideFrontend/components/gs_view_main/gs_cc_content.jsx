import React from 'react'
import conf from '../../conf/gs_view_main.conf.json'

import styles from './gs_cc_content.module.css';
const description = conf.gs_cc_buttons.description;

const GsCcContent = () => {
  return (
    
      <p 
        className={styles.parrafos} dangerouslySetInnerHTML={
          {
            __html:description
          }
      }>        
      </p>
    
    
  )
}

export default GsCcContent;