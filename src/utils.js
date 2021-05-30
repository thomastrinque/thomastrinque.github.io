const removeDups = (items) => {
  let unique = {};
  items.forEach(function (i) {
    if (!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
};

const uniqueValueFromArray = (items) => {
  return [...new Set(items)];
};

export { removeDups, uniqueValueFromArray };
