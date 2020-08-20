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
  addSection,
  addSectionRow,
  deleteSectionRow,
  moveSectionRow,
} from './actions'
import { SectionComponentMemo } from './components/section'
import { ProgressComponentMemo } from './components/progress'
import { HandleComponent } from './components/actions'
import { AddSectionComponent } from './components/addSection'

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
  const { templates, sections, fields } = useSelector<AppState, State>(
    ({ sectionsView }) => sectionsView
  )

  const handleFieldChange = (id: string, value: string) => {
    dispatch(setFieldValue(id, value))
  }

  const handleAddSection = (templateIndex: number) => {
    dispatch(addSection(templateIndex))
  }

  const handleAddSectionRow = (id: string) => {
    return () => dispatch(addSectionRow(id))
  }

  const handleDuplicateSectionRow = (id: string) => {
    return (pos: number) => dispatch(addSectionRow(id, pos, true))
  }

  const handleDeleteSectionRow = (id: string) => {
    return (pos: number) => dispatch(deleteSectionRow(id, pos))
  }

  const handleMoveSectionRow = (id: string) => {
    return (row: string, pos: number) => dispatch(moveSectionRow(id, row, pos))
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
        addSectionRow={handleAddSectionRow(section)}
        duplicateSectionRow={handleDuplicateSectionRow(section)}
        deleteSectionRow={handleDeleteSectionRow(section)}
        moveSectionRow={handleMoveSectionRow(section)}
      />
    </>
  )

  return (
    <Row gutter={[8, 8]}>
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={12}
        xl={12}
        xxl={{ span: 10, offset: 2 }}
      >
        <Row>
          <Col xs={0} sm={0} md={6} lg={8} xl={8}>
            <ProgressComponentMemo sections={sections} />
          </Col>
          <Col xs={24} sm={24} md={18} lg={16} xl={16}>
            <div style={{ padding: '20px 0px' }}>
              {sections.fixedIds.map((section) => (
                <div key={section} id={sections.byId[section].name}>
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
                              id={sections.byId[section].name}
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
              <AddSectionComponent
                templates={templates}
                addSection={handleAddSection}
              />
            </div>
          </Col>
        </Row>
      </Col>
      <Col lg={12} xl={12} xxl={10}></Col>
    </Row>
  )
}
