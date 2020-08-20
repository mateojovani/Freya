import * as React from 'react'
import { FunctionComponent } from 'react'
import { Anchor } from 'antd'

import { Section } from '../types'

type ProgressProps = {
  sections: {
    byId: { [key: string]: Section }
    fixedIds: string[]
    nonFixedIds: string[]
    allIds: string[]
  }
}

const ProgressComponent: FunctionComponent<ProgressProps> = ({ sections }) => (
  <Anchor>
    {sections.allIds.map((section) => (
      <Anchor.Link
        key={section}
        href={'#' + sections.byId[section].name}
        title={sections.byId[section].title}
      />
    ))}
  </Anchor>
)

export const ProgressComponentMemo = React.memo(ProgressComponent)
