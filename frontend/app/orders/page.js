import React from 'react'
import Container from '../components/Container'
import OrderDisplay from './OrderDisplay'

export default function Cart() {
  return (
    <div className='pt-8'>
      <Container>
        <OrderDisplay/>
      </Container>
    </div>
  )
}
