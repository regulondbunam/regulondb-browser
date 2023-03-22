import React from 'react'
import { Remarkable } from 'remarkable';

import styles from './gs_cc_markdown.module.css'

export default function GsCcMarkdown({txt}) {
  return (
    <div>
      <MarkdownEditor text={txt} />
    </div>
    
  );
}

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable({html:true});
    this.state = { value: this.props.text };
  }

  getRawMarkup() {
    return { __html: this.md.render(this.state.value) };
  }

  render() {
    return (
      <div  className={styles.container}>
        <div className={styles.parrafos}
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    );
  }
}

