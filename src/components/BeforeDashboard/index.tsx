import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to your dashboard!</h4>
      </Banner>
      <p>{"Here's what to do next:"}</p>
      <ul className={`${baseClass}__instructions`}>
        <li>Suggestion</li>
        <li>Suggestion</li>
        <li>Suggestion</li>
        <li>Suggestion</li>
      </ul>
      <p>{'Pro Tip: '}</p>
    </div>
  )
}

export default BeforeDashboard
