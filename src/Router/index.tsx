import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { AuthGuard } from './AuthGuard'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/login" element={} />
          <Route path="/register" element={}/>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}