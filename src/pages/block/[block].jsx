import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { Block } from "../../components";
import { getBlockInfo } from "../../alchemy-core";

const Index = ({ blockInfo, error }) => {
  const router = useRoutes();

  useEffect(() => {
    if (error) router.push("/error");
  }, [error, router]);
  return <Block {...blockInfo} />;
};

export default Index;

export const getServerSideProps = async (context) => {
  const { block } = context.query;
  let blockInfo = {};
  let error = null;

  try {
    blockInfo = await getBlockInfo(block);
  } catch (err) {
    error = err.body || err.message || err;
  }

  return {
    props: {
      blockInfo,
      error,
    },
  };
};
