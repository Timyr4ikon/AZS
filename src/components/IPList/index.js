const IPList = ({ arr, error }) => {
  return (
    <>
      {error ? (
        <p>Error</p>
      ) : (
        <ul>
          {arr.map((el) => (
            <li key={el.id}>{el.ip}</li>
          ))}
        </ul>
      )}
    </>
  );
};
export default IPList;
