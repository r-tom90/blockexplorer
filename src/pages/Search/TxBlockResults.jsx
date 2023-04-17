const TxBlockResults = ({ results }) => {
  if (!Array.isArray(results)) {
    return null; // or render an error message
  }

  return (
    <div>
      {results.map((result) => (
        <div key={result.hash}>
          <p>from: {result.from}</p>
          <p>to: {result.to}</p>
          <p>Confirmations: {result.confirmations}</p>
        </div>
      ))}
    </div>
  );
};

export default TxBlockResults;
