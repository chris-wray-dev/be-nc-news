exports.formatDates = list => {
  if (list.length === 0) return [];
  const newList = list.map(object => {
    const newObject = { ...object };
    newObject.created_at = new Date(newObject.created_at);
    return newObject;
  });
  return newList;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
