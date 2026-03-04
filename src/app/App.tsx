import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { CvProvider } from './providers'

function App() {
  return (
    <CvProvider>
      <RouterProvider router={router} />
    </CvProvider>
  )
}

export default App
