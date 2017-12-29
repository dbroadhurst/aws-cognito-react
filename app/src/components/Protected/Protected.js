import React from 'react'

export const ProtectedComponent = () => {
  const style = {
    page: {},
    layout: {},
    heading: {
      textAlign: 'center',
      fontSize: '48px',
      margin: '64px'
    }
  }

  return (
    <div style={style.page}>
      <div style={style.layout}>
        <div style={style.heading}>Protected Page</div>
      </div>
    </div>
  )
}
