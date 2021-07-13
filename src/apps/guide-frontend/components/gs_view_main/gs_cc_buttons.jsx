import React from 'react'
import GsCcButton from './gs_cc_button';
import conf from '../../conf/gs_view_main.conf.json'
import styles from './gs_cc_buttons.module.css';

const buttons = conf.gs_cc_buttons.buttons

function GsCcButtons() {
  return (
    <div className={styles.container}>
      {
        buttons.map(button => (
          <GsCcButton 
            key={`button_main_${button.id}_${button.title}`} 
            title={button.title} 
            link={button.link}
            site={button.site}
            />
        ))
      
      }
    </div>
  )
}

export default GsCcButtons;