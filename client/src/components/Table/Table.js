import React from 'react';
import '../Table/Table.css';
import TableItem from './Tableitem';
import SectionTitle from '../SectionTitles/SectionTitle';

const Table = () => {
  return (
      <div className="section section-padding-t90-b100">
          <div className="container">

              <SectionTitle
                  headingOption="title fz-32"
                  title="QNA"
              />

              <TableItem />
          </div>
      </div>
  )
}

export default Table;