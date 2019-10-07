exports.formatDates = list => {
  if (list.length === 0) return [];
  const newList = list.map(object => {
    const newObject = {
      ...object
    };
    newObject.created_at = new Date(newObject.created_at);
    return newObject;
  });
  return newList;
};

exports.makeRefObj = (list, key1, key2) => {
  if (list.length === 0) return {};
  if (!key1) key1 = Object.keys(list[0])[1];
  if (!key2) key2 = Object.keys(list[0])[0];
  const referenceObject = {};
  list.forEach(object => {
    referenceObject[object[key1]] = object[key2];
  });
  return referenceObject;
};

exports.formatComments = (list, referenceObject, key1, key2) => {
  const newList = list.map(object => {
    const newObject = { ...object };
    newObject[key2] = referenceObject[object[key1]];
    delete newObject[key1];
    return newObject;
  });
  return newList;
};