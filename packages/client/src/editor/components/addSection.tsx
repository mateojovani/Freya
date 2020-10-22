import * as React from 'react'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { Button, Modal, List, Typography } from 'antd'
import { Section } from 'freya-shared'

interface AddSectionProps {
  templates: {
    sections: Section[]
    inUse: string[]
  }
  addSection: (index: number) => void
}

export const AddSectionComponent: React.FunctionComponent<AddSectionProps> = ({
  templates,
  addSection,
}) => {
  const [isModalOpen, setModalOpen] = React.useState(false)

  return (
    <div>
      <Button
        type="primary"
        icon={<AppstoreAddOutlined />}
        onClick={() => setModalOpen(true)}
      >
        Add section
      </Button>
      <Modal
        title="Add a section"
        centered
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Typography.Title level={4}>Start with a template</Typography.Title>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={templates.sections}
          renderItem={(template, i) => (
            <List.Item>
              <Button
                block={true}
                type="dashed"
                disabled={templates.inUse.some((name) => template.name === name)}
                onClick={() => {
                  addSection(i)
                  setModalOpen(false)
                }}
              >
                {template.title}
              </Button>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  )
}
