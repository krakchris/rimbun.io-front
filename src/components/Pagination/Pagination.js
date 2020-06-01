import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Example = props => {
  const count = props.count;
  const currentPage = props.currentPage;
  const perPage = 10;
  console.log(count);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(count / perPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    if (number == 1 || number == count || (number >= currentPage - 2 && number <= currentPage + 2)) {
      console.log()
      return (
        <PaginationItem key={number} active={currentPage == number}>
          <PaginationLink onClick={() => props.fetchMaps(number)}>{number}</PaginationLink>
        </PaginationItem>
      );
    }
  });

  let previous = 0;
  previous = currentPage - 1;
  previous = (previous) ? previous : 1;
  let next = 0;
  next = currentPage + 1;
  console.log(next);
  next = (pageNumbers.indexOf(next) != '-1') ? next : currentPage;
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink previous onClick={() => props.fetchMaps(previous)} />
      </PaginationItem>
      {renderPageNumbers}
      <PaginationItem>
        <PaginationLink next onClick={() => props.fetchMaps(next)} />
      </PaginationItem>
    </Pagination>
  );
};

export default Example;
