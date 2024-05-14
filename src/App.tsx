import { useRoutes } from 'react-router-dom'
import routes from './router'
function App() {
  let outlet = useRoutes(routes)
  return (
    <div className="App">
      {outlet}
    </div>
  )
}

export default App
