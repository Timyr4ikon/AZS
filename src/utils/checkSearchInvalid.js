export const checkInvalid = (e, min, max) => {
  const { value, classList } = e.target;
  if (value.length === 0) {
    classList.remove("invalid");
  } else if (value.length < min || value.length > max) {
    classList.add("invalid");
  } else {
    classList.remove("invalid");
  }
};
