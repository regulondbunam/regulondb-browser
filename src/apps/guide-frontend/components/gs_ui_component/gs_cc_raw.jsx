import React, {useState, useEffect} from 'react'
import GsCcMarkdown from './gs_cc_markdown';
import styles from './gs_cc_raw.module.css';

const GSCcRaw = ({setState}) => {

  const [ data, setData ] = useState("");
  const [ _url, set_url ] = useState("https://raw.githubusercontent.com/regulondbunam/Component-Repository/ui-components/README.md");

  let button_less = document.querySelector('#buttonOcultar');
  let mD = document.querySelector('#MostrarMD');

  if(button_less || mD){
    button_less.style.display="none"
    mD.style.display="none"
  }

  useEffect(()=>{
    const body = document.getElementById("gs_cc_raw_012")
    if(body){
      body.addEventListener('updateBody', e => {
        set_url(e.detail?.url)
        setData("")
      });
    }
    if(data===""){
      setState("loading")
      try{
        fetch(_url)
      .then(response => response.text())
      .then(text => setData(text))
      }catch(e){
        console.error(e)
        setState("error")
      }
    }else{
      setState("done")
    }
  }, [data,_url,set_url])

  const mostrarMarkdown = () => {
    document.querySelector('#MostrarMD').style.display = 'block';
    document.querySelector('#buttonMostrar').style.display = 'none';
    document.querySelector('#buttonOcultar').style.display = 'block';
  }

  const ocultarMarkdown = () => {
    document.querySelector('#MostrarMD').style.display = 'none';
    document.querySelector('#buttonMostrar').style.display = 'block';
    document.querySelector('#buttonOcultar').style.display = 'none';
  }

  const inicio = `/**`;
  const final = `**/`;

  let cleanData = data.substring(data.indexOf(inicio)+3, data.indexOf(final));
  let segundoMD = data.substring(data.indexOf(inicio,data.indexOf(inicio)+3)+3, data.indexOf(final,data.indexOf(final)+3) );


  return (
    <div id="gs_cc_raw_012" className={styles.container}>
      {
        data === "" ? '' : 
        
        data.includes('/**') 
        ? <GsCcMarkdown txt={cleanData} />
        : <GsCcMarkdown txt={data} />
        
      }

      <div id="MostrarMD" style={{display:'none'}}>
        <hr style={{height:'2px',border:'none', backgroundColor:'#3d779b', borderRadius:'10px'}}/>

        {
          data === "" ? '' : 
        
            data.includes('/**') ? <GsCcMarkdown txt={segundoMD} />
            : '' 
        }

      </div>
      {
        data === "" ? '' :
        data.includes('/**') ?
        <button
          id="buttonMostrar"
          onClick={ mostrarMarkdown } 
          className={styles.buttonMostrar}>
          Technical guide
        </button>
        : ''
      }
      
        <button
          id="buttonOcultar"
          onClick={ ocultarMarkdown } 
          className={styles.buttonOcultar}>
          See less
        </button>
    </div>
  )
}

export default GSCcRaw
