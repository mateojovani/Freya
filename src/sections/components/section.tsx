import * as React from 'react'
import { FunctionComponent, useCallback } from 'react'
import { Row, Col, Form, Input, Button } from 'antd'
import styled from 'styled-components'
import { PlusOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { Section, Field, FieldType } from '../types'
import {
  Actions,
  HandleComponent,
  DeleteComponent,
  DuplicateComponent,
} from './actions'

type SectionProps = {
  section: Section
  fields: { byId: { [key: string]: Field }; allIds: string[] }
  fieldChange: (name: string, value: string) => void
  addSectionRow?: () => void
  duplicateSectionRow?: (index: number) => void
  deleteSectionRow?: (index: number) => void
  moveSectionRow?: (name: string, pos: number) => void
}

type FieldProps = {
  id: string
  field: Field
  handleChange: (id: string, value: string) => void
}

const FieldComponent: FunctionComponent<FieldProps> = ({
  id,
  field,
  handleChange,
}) => {
  const handleChangeMemo = useCallback(
    (ev) => {
      handleChange(id, ev.target.value)
    },
    [field]
  )

  switch (field.type) {
    case FieldType.RichText:
      return (
        <Input.TextArea
          value={field.value}
          id={id}
          onChange={handleChangeMemo}
        />
      )
    default:
      return (
        <Input
          value={field.value}
          id={id}
          type={field.type}
          onChange={handleChangeMemo}
        />
      )
  }
}

const FieldComponentMemo = React.memo(
  FieldComponent,
  (prevProps, nextProps) => {
    return prevProps.field.value === nextProps.field.value
  }
)

const FormRow = styled.div`
  &:hover ${Actions} {
    visibility: visible;
  }
`

const getRowsStyle = (isDragging: boolean) => {
  return {
    ...(isDragging ? { border: '1px dashed #d9d9d9', padding: '20px' } : {}),
  }
}

const getRowStyle = (isDragging: boolean, draggableStyle) => {
  return {
    ...(isDragging ? {} : {}),
    ...draggableStyle,
  }
}

const SectionComponent: FunctionComponent<SectionProps> = ({
  section,
  fields,
  fieldChange,
  addSectionRow,
  duplicateSectionRow,
  deleteSectionRow,
  moveSectionRow,
}) => {
  const handleDragEnd = useCallback((result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    moveSectionRow(result.draggableId, result.destination.index)
  }, [])

  const renderSectionFields = (sectionFields: string[][]) =>
    sectionFields.map((fieldsRow, i) => (
      <Row key={i} gutter={[16, 0]}>
        {fieldsRow.map((field) => (
          <Col key={field} span={24 / fieldsRow.length}>
            <Form.Item
              name={fields.byId[field].name}
              label={fields.byId[field].title}
            >
              <FieldComponentMemo
                id={field}
                field={fields.byId[field]}
                handleChange={fieldChange}
              />
            </Form.Item>
          </Col>
        ))}
      </Row>
    ))

  return (
    <Form layout="vertical" style={{ marginBottom: '50px' }}>
      {section.canRepeat && section.fields.length > 1 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable-section">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getRowsStyle(snapshot.isDraggingOver)}
              >
                {section.fields.map(({ name, fields: sectionFields }, i) => (
                  <Draggable key={name} draggableId={name} index={i}>
                    {(provided, snapshot) => (
                      <FormRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={getRowStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Actions>
                          <HandleComponent
                            dragProps={provided.dragHandleProps}
                            size="small"
                          />
                          <DuplicateComponent
                            onClick={() => duplicateSectionRow(i)}
                          />
                          <DeleteComponent
                            onClick={() => deleteSectionRow(i)}
                          />
                        </Actions>

                        {renderSectionFields(sectionFields)}
                      </FormRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <FormRow>{renderSectionFields(section.fields[0].fields)}</FormRow>
      )}
      {section.canRepeat ? (
        <Button type="dashed" icon={<PlusOutlined />} onClick={addSectionRow}>
          {section.addLabel}
        </Button>
      ) : null}
    </Form>
  )
}

export const SectionComponentMemo = React.memo(SectionComponent)
