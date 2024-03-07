'use client'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
export default function tokenPage() {

    
    const router = useRouter()
    const token  = router.query;

    useEffect(() => { 


    }, [])

  return ( 
  
    <div> 
        confirmation whit token page
        <p>Post: {router.query.slug}</p>
    </div> 
  
  )
}
