import styled from 'styled-components'

//styles
import './App.css'

//components
import { HackerNewsPage } from './screens/HackerNewsPage'

const Container = styled.div`
  background:#f3f4f6;
  width:100vw;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
`

function App() {
  return (
    <Container>
      <HackerNewsPage />
    </Container>
  );
}

export default App