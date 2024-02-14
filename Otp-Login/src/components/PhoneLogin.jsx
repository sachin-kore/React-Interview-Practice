import React, { useState } from 'react'
import OtpForm from './OtpForm'

const PhoneLogin = () => {
  const [number, setNumber] = useState('')
  const [showNumber, setShowNumber] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const regex = /[^0-9]/g
    if (number.length < 10 || regex.test(number)) {
      alert('Invalid number')
      return
    }
    setShowNumber(true)
  }

  const onOtpSubmit = (otp) => {
    console.log('Otp entered successfully', otp)
  }
  return (
    <>
      {!showNumber ? (
        <form className="phoneForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your phone number..."
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button>Submit</button>
        </form>
      ) : (
        <OtpForm length={4} onOtpSubmit={onOtpSubmit} />
      )}
    </>
  )
}

export default PhoneLogin
