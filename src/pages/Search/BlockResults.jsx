import { Network, Alchemy, Utils } from "alchemy-sdk";
import moment from "moment/moment";

const BlockResults = ({ results }) => {
  if (!Array.isArray(results)) {
    return null; // or render an error message
  }

  return (
    <div>
      {results.map((result) => (
        <div key={result.hash}>
          <p>
            Block Number:
            <span className="ml-1 text-activeLight">{result.number}</span>
          </p>
          <p>
            Tx Hash: <span className="text-activeLight">{result.hash}</span>
          </p>
          <p>
            Timestamp:
            <span className="ml-1 text-activeLight">
              {moment(result.timestamp * 1000).fromNow()}
            </span>
          </p>
          <p>
            Gas Used:
            <span className="ml-1 text-activeLight">
              {Utils.formatUnits(result.gasUsed._hex, "gwei")} Gwei
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default BlockResults;
