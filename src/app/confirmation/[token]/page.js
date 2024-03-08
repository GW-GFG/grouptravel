'use client'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
export default function tokenPage( { params } ) {

    

    useEffect(() => { 
        
      console.log('token = ', params)
    //  fetch('http://localhost:5500/confirmation/T03V7khXJS8xh4A_BI7tmYDlCwGe6-Uu')

    }, [])

  return ( 
  
    <div> 
        confirmation whit token page 

        
    </div> 
  
  )
}
