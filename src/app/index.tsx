import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { PingResponse, PingUrl } from '~/src/shared'

window.React = React

let root = createRoot(
  document.getElementById('app')!
)

let App = () => {

	useEffect(() => {
		fetch(PingUrl)
			.then(res => res.json())
			.then(res => res as PingResponse)
			.then(pong => console.log(pong.value))
	})

	return (
		<div>
			App Noice
		</div>
	)
}

root.render(<App />)
