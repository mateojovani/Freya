import * as React from 'react'
import { FunctionComponent } from 'react'
import { Anchor } from 'antd'
import styled from 'styled-components'

import { Section } from '../types'

type ProgressProps = {
  sections: {
    byId: { [key: string]: Section }
    fixedIds: string[]
    nonFixedIds: string[]
    allIds: string[]
  }
}

const StyledProgress = styled.div`
  // .ant-anchor-wrapper {
  //   -moz-transform: scaleX(-1);
  //   -webkit-transform: scaleX(-1);
  //   -o-transform: scaleX(-1);
  //   transform: scaleX(-1);
  // }

  // .ant-anchor-link-title {
  //   -moz-transform: scaleX(-1);
  //   -webkit-transform: scaleX(-1);
  //   -o-transform: scaleX(-1);
  //   transform: scaleX(-1);
  // }
`

const ProgressComponent: FunctionComponent<ProgressProps> = ({ sections }) => (
  <StyledProgress>
    <Anchor>
      {sections.allIds.map((section) => (
        <Anchor.Link
          key={section}
          href={'#' + sections.byId[section].name}
          title={sections.byId[section].title}
        />
      ))}
    </Anchor>
  </StyledProgress>
)

export const ProgressComponentMemo = React.memo(ProgressComponent)
