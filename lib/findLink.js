export const findLink = (page, view) => {
  let links = { prev: `/items/${page - 1}`, next: `/items/${page + 1}` };
  if (view === "giving") {
    (links.prev = `/giving/${page - 1}`), (links.next = `/giving/${page + 1}`);
  }
  if (view === "given") {
    (links.prev = `/given/${page - 1}`), (links.next = `/given/${page + 1}`);
  }
  if (view === "taken") {
    (links.prev = `/taken/${page - 1}`), (links.next = `/taken/${page + 1}`);
  }
  return links;
};
