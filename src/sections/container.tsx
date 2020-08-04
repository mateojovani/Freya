import * as React from 'react'
import { Dispatch, FunctionComponent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Typography, Row, Col } from 'antd'
import styled from 'styled-components'

import { AppState } from '../types'
import { State, SectionsAction } from './types'
import {
  setFieldValue,
  moveSection,
  addSectionRow,
  deleteSectionRow,
  moveSectionRow,
} from './actions'
import { SectionComponentMemo } from './components/section'
import { ProgressComponentMemo } from './components/progress'
import { HandleComponent } from './components/actions'

const getSectionsStyle = (isDragging: boolean) => {
  return {
    ...(isDragging ? { border: '1px dashed #d9d9d9', padding: '20px' } : {}),
  }
}

const getSectionStyle = (isDragging: boolean, draggableStyle) => {
  return {
    ...(isDragging ? {} : {}),
    ...draggableStyle,
  }
}

const SectionTitle = React.memo<{ title: string }>(({ title }) => (
  <Typography.Title level={4}>{title}</Typography.Title>
))

const Actions = styled.div`
  position: absolute;
  margin-left: -35px;
  z-index: 999;
`

export const SectionsComponent: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch<SectionsAction>>()
  const { sections, fields } = useSelector<AppState, State>(
    ({ sectionsView }) => sectionsView
  )

  const handleFieldChange = (field: string, value: string) => {
    dispatch(setFieldValue(field, value))
  }

  const handleAddSectionRow = (name: string) => {
    return () => dispatch(addSectionRow(name))
  }

  const handleDuplicateSectionRow = (name: string) => {
    return (pos: number) => dispatch(addSectionRow(name, pos, true))
  }

  const handleDeleteSectionRow = (name: string) => {
    return (pos: number) => dispatch(deleteSectionRow(name, pos))
  }

  const handleMoveSectionRow = (name: string) => {
    return (row: string, pos: number) =>
      dispatch(moveSectionRow(name, row, pos))
  }

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    dispatch(moveSection(result.draggableId, result.destination.index))
  }

  const renderSection = (section: string) => (
    <>
      <SectionTitle title={sections.byId[section].title} />
      <SectionComponentMemo
        section={sections.byId[section]}
        fields={fields}
        fieldChange={handleFieldChange}
        addSectionRow={handleAddSectionRow(sections.byId[section].name)}
        duplicateSectionRow={handleDuplicateSectionRow(
          sections.byId[section].name
        )}
        deleteSectionRow={handleDeleteSectionRow(sections.byId[section].name)}
        moveSectionRow={handleMoveSectionRow(sections.byId[section].name)}
      />
    </>
  )

  return (
    <Row gutter={[8, 8]}>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={{ span: 10, offset: 2 }}
      >
        <Row>
          <Col xs={0} sm={8} md={8} lg={8} xl={8}>
            <ProgressComponentMemo sections={sections} />
          </Col>
          <Col xs={24} sm={16} md={16} lg={16} xl={16}>
            <div style={{ padding: '20px 0px' }}>
              {sections.fixedIds.map((section) => (
                <div key={section} id={section}>
                  {renderSection(section)}
                </div>
              ))}
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable-sections">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getSectionsStyle(snapshot.isDraggingOver)}
                    >
                      {sections.nonFixedIds.map((section, index) => (
                        <Draggable
                          key={section}
                          draggableId={section}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              id={section}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              style={getSectionStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <Actions>
                                <HandleComponent
                                  dragProps={provided.dragHandleProps}
                                  size="small"
                                />
                              </Actions>
                              {renderSection(section)}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </Col>
        </Row>
      </Col>
      <Col md={12} lg={12} xl={12} xxl={10}></Col>
    </Row>
  )
}
