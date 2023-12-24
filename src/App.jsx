
import React from 'react'
import Home from './Page/Home';
import EditTask from './Page/EditTask';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    	<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/edit/:id" element={<EditTask />} />
			</Routes>
		</>
  )
}

export default App;






