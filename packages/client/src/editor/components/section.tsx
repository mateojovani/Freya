const moment = require('moment')
import * as React from 'react'
import { FunctionComponent, useCallback } from 'react'
import { Row, Col, Form, Input, Button, DatePicker } from 'antd'
import styled from 'styled-components'
import { PlusOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { Field, FieldType } from 'freya-shared'
import {
  Actions,
  HandleComponent,
  DeleteComponent,
  DuplicateComponent,
} from './actions'
import { EditorComponent } from './editor'
import { NormalisedSection } from '../reducer'

type SectionProps = {
  section: NormalisedSection
  fields: { byId: { [key: string]: Field }; allIds: string[] }
  fieldChange: (name: string, value: string) => void
  addSectionRow?: () => void
  duplicateSectionRow?: (index: number) => void
  deleteSectionRow?: (index: number) => void
  moveSectionRow?: (rowIdx: number, pos: number) => void
}

type FieldProps = {
  id: string
  field: Field
  handleChange: (id: string, value) => void
}

const FieldComponent: FunctionComponent<FieldProps> = ({
  id,
  field,
  handleChange,
}) => {
  switch (field.type) {
    case FieldType.RichText:
      return (
        <EditorComponent
          id={field.name}
          value={field.value}
          onChange={(value) => handleChange(id, value)}
        />
      )
    case FieldType.DateRange:
      const dates = field.value
        ? field.value.map((date) => {
            if (typeof date === 'string') {
              return moment(date)
            }

            return date
          })
        : null

      return (
        <DatePicker.RangePicker
          id={field.name}
          picker="month"
          allowEmpty={[false, true]}
          // @ts-ignore
          value={dates}
          onChange={(dates) => handleChange(id, dates)}
          onPanelChange={(dates) => handleChange(id, dates)}
        />
      )
    default:
      return (
        <Input
          id={field.name}
          value={field.value}
          type={field.type}
          onChange={(ev) => handleChange(id, ev.target.value)}
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
  margin-bottom: 30px;
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
                {section.fields.map((sectionFields, i) => (
                  <Draggable key={i} draggableId={i + ''} index={i}>
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
        <FormRow>{renderSectionFields(section.fields[0])}</FormRow>
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
