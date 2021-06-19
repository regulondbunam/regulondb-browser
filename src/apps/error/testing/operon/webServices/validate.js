import React, { useEffect } from 'react';
import { gql } from "apollo-boost";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';

export function query() {
  return gql`
  {
    getAllOperon(limit:10){
      pagination{
        totalResults
      }
    }
  }
    `
}

export const Validate = ({
  status = () => { },
  resoultsData = () => { },
}) => {
  const { data, loading, error } = useQuery(query())
  useEffect(() => {
    if (loading) {
      status('loading')
    }
    if (data) {
      if (data.getOperonBy.pagination.totalResults === 1) {
        try {
          resoultsData(data.getOperonBy.data[0].operon)
          status('done')
        } catch (error) {
          status('error')
          console.log(error)
        }
      } else {
        resoultsData({})
        status('not found')
      }
    }
    if (error) {
      status('error')
      console.log(error)
    }

  })
  if (loading) {
    return <></>
  }
  if (error) {
    console.log(error)
    return <></>
  }
  try {
    // Structed data
  } catch (error) {
  }
  return (<></>);
}

export default Validate;