export const findLink = (page, status) => {
  let links = { prev: `/items/${page - 1}`, next: `/items/${page + 1}` };
  if (status === "ONGOING") {
    (links.prev = `/items/${page - 1}`), (links.next = `/items/${page + 1}`);
  }
  if (status === "GIVEN") {
    (links.prev = `/taken/${page - 1}`), (links.next = `/taken/${page + 1}`);
  }
  return links;
};
