import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { SelectPage } from './components/SelectPage'
import { GamePage } from './components/GamePage'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/game/:id" element={<GamePage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
