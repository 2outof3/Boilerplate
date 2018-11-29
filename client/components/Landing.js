import React from 'react'
import { UncontrolledCarousel } from 'reactstrap'

const crslitems = [
  {
    src: 'https://loremflickr.com/320/240?random=1',
    altText: 'Slide 1',
    caption: 'Slide 1',
    header: 'Slide 1 Header'
  },
  {
    src: 'https://loremflickr.com/320/240?random=2',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src: 'https://loremflickr.com/320/240?random=3',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
]
// <h1> This would be the landing component </h1>

const Landing = () => (
	<div>
    <UncontrolledCarousel items={crslitems} />
	</div>
)

export default Landing
