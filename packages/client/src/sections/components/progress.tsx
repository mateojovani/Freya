import * as React from 'react'
import { FunctionComponent } from 'react'
import { Anchor } from 'antd'

import { NormalisedSection } from '../reducer'
import styled from 'styled-components'

type ProgressProps = {
  sections: {
    byId: { [key: string]: NormalisedSection }
    fixedIds: string[]
    nonFixedIds: string[]
    allIds: string[]
  }
}

const StyledProgress = styled(Anchor)`
  .ant-anchor {
    font-size: 14px
  }
`

const ProgressComponent: FunctionComponent<ProgressProps> = ({ sections }) => (
  <StyledProgress>
    {sections.allIds.map((section) => (
      <Anchor.Link
        key={section}
        href={'#' + sections.byId[section].name}
        title={sections.byId[section].title}
      />
    ))}
  </StyledProgress>
)

export const ProgressComponentMemo = React.memo(ProgressComponent)
