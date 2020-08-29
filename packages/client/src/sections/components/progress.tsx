import * as React from 'react'
import { FunctionComponent } from 'react'
import { Anchor } from 'antd'

import { NormalisedSection } from '../reducer'

type ProgressProps = {
  sections: {
    byId: { [key: string]: NormalisedSection }
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
