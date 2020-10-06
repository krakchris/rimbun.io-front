import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const GridPagination = props => {
  const count = props.count;
  const currentPage = props.currentPage;
  const perPage = props.limit;
  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(count / perPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    if (number == 1 || number == count || (number >= currentPage - 2 && number <= currentPage + 2)) {
      return (
        <PaginationItem key={number} active={currentPage == number}>
          <PaginationLink onClick={() => props.fetchMaps({ pageNo: number, limit: perPage })}>{number}</PaginationLink>
        </PaginationItem>
      );
    }
  });

  let previous = 0; previous = currentPage - 1 ? currentPage - 1 : 1;
  let next = 0; next = pageNumbers.indexOf(currentPage + 1) != "-1" ? currentPage + 1 : currentPage;
  return (
    <React.Fragment>
      {pageNumbers.length >1 && <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink
            previous
            onClick={() =>
              props.fetchMaps({ pageNo: previous, limit: perPage })
            }
          />
        </PaginationItem>
        {renderPageNumbers}
        <PaginationItem>
          <PaginationLink
            next
            onClick={() => props.fetchMaps({ pageNo: next, limit: perPage })}
          />
        </PaginationItem>
      </Pagination>}
    </React.Fragment>
  );
};

export default GridPagination;
