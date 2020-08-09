import reducer from './reducer'
import { setFieldValue, addSection, moveSection, addSectionRow, moveSectionRow, deleteSectionRow } from './actions'
import { sectionsMockNormalised } from '../utils'

describe('Sections Reducer', () => {
  test('Set field value', () => {
    const state = reducer(sectionsMockNormalised, setFieldValue('681a3228-a410-4f7a-96cd-0d6d9274faf3', 'Loki'))
    expect(state.fields.byId['681a3228-a410-4f7a-96cd-0d6d9274faf3'].value).toEqual('Loki')
  })

  test('Add section', () => {
    const state = reducer(sectionsMockNormalised, addSection(1))
    expect(state.sections.allIds.length).toEqual(4)
    expect(state.sections.nonFixedIds.length).toEqual(3)
    const addedSection = state.sections.byId[state.sections.allIds[3]]
    expect(addedSection.name).toEqual('experience')
    expect(addedSection.fields.length).toEqual(1)
    const addedField = addedSection.fields[0].fields[0][0]
    expect(state.fields.byId[addedField].name).toEqual('job_title')
  })

  test('Move section', () => {
    const state = reducer(sectionsMockNormalised, moveSection('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 2))
    expect(state.sections.allIds.indexOf('fe0dfdf-048f-ed65-6db6-cbf45746f8e7')).toEqual(3)
    expect(state.sections.nonFixedIds.indexOf('fe0dfdf-048f-ed65-6db6-cbf45746f8e7')).toEqual(2)
  })

  test('Add section row', () => {
    const state = reducer(sectionsMockNormalised, addSectionRow('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 0, true))
    expect(state.sections.allIds.length).toEqual(3)
    expect(state.sections.nonFixedIds.indexOf('fe0dfdf-048f-ed65-6db6-cbf45746f8e7')).toEqual(0)
    const sectionFields = state.sections.byId['fe0dfdf-048f-ed65-6db6-cbf45746f8e7'].fields
    expect(sectionFields.length).toEqual(2)
    expect(state.fields.allIds.length).toEqual(7)
  })

  test('Move section row', () => {
    const afterAddState = reducer(sectionsMockNormalised, addSectionRow('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 0))
    const state = reducer(afterAddState, moveSectionRow('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 'row_845c3b-08ef-c007-185d-c7311ec5622', 0))
    expect(state.sections.allIds.length).toEqual(3)
    expect(state.sections.nonFixedIds.indexOf('fe0dfdf-048f-ed65-6db6-cbf45746f8e7')).toEqual(0)
    const sectionFields = state.sections.byId['fe0dfdf-048f-ed65-6db6-cbf45746f8e7'].fields
    expect(sectionFields[0].name).toEqual('row_845c3b-08ef-c007-185d-c7311ec5622')
  })

  test('Delete section row', () => {
    const afterAddState = reducer(sectionsMockNormalised, addSectionRow('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 0))
    const state = reducer(afterAddState, deleteSectionRow('fe0dfdf-048f-ed65-6db6-cbf45746f8e7', 1))
    expect(state.sections.allIds.length).toEqual(3)
    expect(state.sections.nonFixedIds.indexOf('fe0dfdf-048f-ed65-6db6-cbf45746f8e7')).toEqual(0)
    const sectionFields = state.sections.byId['fe0dfdf-048f-ed65-6db6-cbf45746f8e7'].fields
    expect(sectionFields.length).toEqual(1)
    expect(sectionFields[0].name).toEqual('row_845c3b-08ef-c007-185d-c7311ec5622')
  })
})
