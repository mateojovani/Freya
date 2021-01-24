import * as React from 'react'
import { Layout, Button, Tooltip } from 'antd'
import { client, downloadCVMutation } from 'freya-shared'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useParams,
  Redirect,
} from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { CloudDownloadOutlined } from '@ant-design/icons'

import { AppHeader } from '../header/container'
import { LibraryComponent } from '../library/container'
import { ResumeEditor } from '../editor/container'
import { GetStarted } from '../get-started/container'
import { ManageAccountComponent } from '../header/components/manageAccount'
import { Save } from '../save/container'
import { useMutation, useQuery } from '../utils'

const ProtectedResumeEditor = withAuthenticationRequired(ResumeEditor)

const LoginCallback: React.FunctionComponent = () => {
  const sessionStorageUri = sessionStorage.getItem('callback')
  sessionStorage.removeItem('callback')
  const redirectUri = sessionStorageUri ? sessionStorageUri : '/library'

  return <Redirect to={redirectUri} />
}

const AppHeaderWithSaveCV: React.FunctionComponent = () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()
  const { loginWithRedirect } = useAuth0()

  const handleSaveCVClick = () => {
    sessionStorage.setItem('callback', `/save/${params.id}`)
    loginWithRedirect({ redirectUri: `${location.origin}/callback` })
  }

  return (
    <AppHeader
      subTitle="Resume editor"
      onBack={() => history.push('/')}
      action={[
        <Button key="1" type="primary" onClick={handleSaveCVClick}>
          Save CV
        </Button>,
      ]}
    />
  )
}

const DownloadCV: React.FunctionComponent = () => {
  const params = useParams<{ id: string }>()
  const [downloadCV, { response, isLoading }] = useMutation(downloadCVMutation)

  React.useEffect(() => {
    if (response && response.downloadCV) {
      const link = document.createElement('a')
      link.target = '_blank'
      link.href = response.downloadCV
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }, [response])

  return (
    <Tooltip title="Download as PDF">
      <Button
        style={{ marginLeft: '10px' }}
        icon={<CloudDownloadOutlined />}
        onClick={() => {
          downloadCV({ id: params.id })
        }}
      />
    </Tooltip>
  )
}

const Header = () => {
  const history = useHistory()
  const { logout } = useAuth0()

  return (
    <Switch>
      <Route path="/library">
        <AppHeader
          subTitle="My library"
          action={[<ManageAccountComponent onLogout={logout} key="1" />]}
        />
      </Route>
      <Route path="/resume/:id">
        <AppHeader
          subTitle="Resume editor"
          onBack={() => history.push('/')}
          action={[
            <div key="1">
              <ManageAccountComponent onLogout={logout} />
              <DownloadCV />
            </div>,
          ]}
        />
      </Route>
      <Route path="/start/:id">
        <AppHeaderWithSaveCV />
      </Route>
    </Switch>
  )
}

export const Main = () => {
  const { error, isAuthenticated, user, getAccessTokenSilently } = useAuth0()

  const [isLoading, setIsLoading] = React.useState(true)

  const setAuthTokenHeader = async () => {
    try {
      const token = await getAccessTokenSilently()
      client.setHeader('Authorization', `Bearer ${token}`)
    } catch (e) {
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    setAuthTokenHeader()
  }, [])

  if (error) {
    return <div>Something went wrong</div>
  }

  if (isLoading) {
    return <div></div>
  }

  return (
    <Router>
      <Header />
      <Layout>
        <Layout.Content style={{ padding: '0 0 0 10px', background: 'white' }}>
          <Switch>
            <Route exact path="/">
              {isAuthenticated ? (
                <Redirect to="/library" />
              ) : (
                <Redirect to="/start" />
              )}
            </Route>
            <Route exact path="/callback">
              <LoginCallback />
            </Route>
            <Route path="/library">
              <LibraryComponent />
            </Route>
            <Route exact path="/start">
              {isAuthenticated ? <Redirect to="/library" /> : <GetStarted />}
            </Route>
            <Route path="/resume/:id">
              <ProtectedResumeEditor />
            </Route>
            <Route path="/start/:id">
              <ResumeEditor />
            </Route>
            <Route path="/save/:id">
              <Save />
            </Route>
          </Switch>
        </Layout.Content>
      </Layout>
    </Router>
  )
}
