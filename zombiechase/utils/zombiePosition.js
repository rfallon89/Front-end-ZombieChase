const { getPathLength, getPreciseDistance } = require("geolib");

export const zombiePositionArray = (position, zombieDistance, index = 1) => {
  if (position.length > 0) {
    if (
      zombieDistance <=
      getPathLength(position.slice(0, index), getPreciseDistance)
    ) {
      return position.slice(0, index);
    } else if (index === position.length - 1) {
      return position;
    } else {
      return zombiePositionArray(position, zombieDistance, index + 1);
    }
  }
};
