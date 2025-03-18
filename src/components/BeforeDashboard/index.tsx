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
        <li>Add a new Article by clicking on `Articles` under `Collections`.</li>
        <li>Edit your navigation items under `Globals` {'->'} `Header`.</li>
        <li>Add and edit images by clicking on `Media` under `Collections`.</li>
      </ul>
      <p>{'Pro Tip: '}</p>
      <p>
        {
          'Please do not edit any other fields or collections while this project is still in development.'
        }
      </p>
    </div>
  )
}

export default BeforeDashboard
