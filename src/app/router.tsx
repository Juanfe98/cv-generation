import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { LandingPage } from '../features/landing'
import { EditorPage } from '../features/editor/EditorPage'
import { PreviewPage } from '../features/preview/PreviewPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'editor',
        element: <EditorPage />,
      },
      {
        path: 'preview',
        element: <PreviewPage />,
      },
    ],
  },
])
