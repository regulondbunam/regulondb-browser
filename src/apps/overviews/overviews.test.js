import { render, screen, fireEvent } from '@testing-library/react';
import {ApolloProvider} from '@apollo/client'
import WebServices from '../componets/webservices/WebServices'
import client from '../apollo_client';
import Overviews from './index'

describe("Test Overviews Application mainView",()=>{
  // despliegue de informacion estatica
  it('check cover title display', () => {
    render(<ApolloProvider client={client} ><Overviews /></ApolloProvider>);
    expect(screen.getByRole('heading')).toHaveTextContent('Overviews')
  });
  // despliegue de datos del servicio web
  it('check Dropdown list gene display',async ()=>{
    render(<ApolloProvider client={client} ><Overviews /></ApolloProvider>);
    await screen.findByRole('dropdownList')
    expect(screen.getByRole('dropdownList')).toHaveTextContent('gene')
  })
  // Eventos del usuario
  it('check Dropdown item list display', async ()=>{
    render(<ApolloProvider client={client} ><Overviews /></ApolloProvider>);
    await screen.findByRole('dropdownList')
    fireEvent.click(screen.getByRole('dropdownList'))
  })
  // validacion de datos recibidos
  describe("Test webservices",()=>{
    it('Validating web service response with schema in code',()=>{
        render(<ApolloProvider client={client} >
            <WebServices datamart_name={"getAllObjectInfo"}
                getData={(overviews)=>{
                    validateOverviewsData(overviews.data[0],{});
                }}
            />
        </ApolloProvider>)

    })
  })
})

function validateOverviewsData(data,schema){
    console.log(data)
    expect(data.__typename).toMatch('overviewInfoType')
}
