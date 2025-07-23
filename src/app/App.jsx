import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import '../App.css'
import Register from '../features/auth/ui/Register'
import Login from '../features/auth/ui/Login'
import { Layout, Menu } from 'antd'

const { Header, Content } = Layout

function App() {
  
  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Menu theme='dark' mode='horizontal'>
            <Menu.Item key={'1'}>
              <Link to="/login">Вход</Link>
            </Menu.Item>
            <Menu.Item key={'2'}>
              <Link to="/register">Регистрация</Link>
            </Menu.Item>
            <Menu.Item key={'3'}>
              <Link to="/profile">Профиль</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  )
}

export default App
