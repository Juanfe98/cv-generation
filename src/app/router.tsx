import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from './Layout'
import { EditorPage } from '../features/editor/EditorPage'
import { PreviewPage } from '../features/preview/PreviewPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/editor" replace />,
      },
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
