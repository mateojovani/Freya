import * as React from 'react'
import { Dropdown, Menu, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

type ManageAccountProps = { onLogout: () => void }

export const ManageAccountComponent: React.FunctionComponent<ManageAccountProps> = ({ onLogout }) => {
  const handleMenuClick = (menu) => {
    switch (menu.key) {
      case "1": {
        onLogout()
        break
      }
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        Log out
      </Menu.Item>
    </Menu>
  )


  return (
    <Dropdown overlay={menu}>
      <Button>
        Account <UserOutlined />
      </Button>
    </Dropdown>
  )
}
