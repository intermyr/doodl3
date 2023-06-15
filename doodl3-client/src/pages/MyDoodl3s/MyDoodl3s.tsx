import { useAccount } from "wagmi";
import chainConf from "../../utils/chainConf";
import { Card, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import ipfsApi from "../../store/ipfsApi";
import {
  useDoodl3NftGetOwnedTokenIds,
  useDoodl3NftTokenUri,
} from "../../generated";

const MyDoodl3s = () => {
  const { address: userAddress } = useAccount();
  const { data: tokenIds } = useDoodl3NftGetOwnedTokenIds({
    args: [userAddress as `0x${string}`],
    address: chainConf.contractAddress,
  });

  return (
    <SimpleGrid cols={4}>
      {tokenIds?.map((tokenId) => (
        <Doodl3Card key={tokenId.toString()} tokenId={tokenId} />
      ))}
    </SimpleGrid>
  );
};

export default MyDoodl3s;

interface Doodl3 {
  tokenId: bigint;
}

const Doodl3Card: React.FC<Doodl3> = ({ tokenId }) => {
  const { data: tokenURI } = useDoodl3NftTokenUri({
    address: chainConf.contractAddress,
    args: [tokenId],
  });

  const {
    data: ipfsData,
    isFetching,
    isError,
  } = ipfsApi.useGetJSONQuery(tokenURI?.replace("ipfs://", ""), {
    skip: !tokenURI,
  });

  return (
    <Card withBorder shadow="sm">
      <Stack>
        <Title order={2}>{ipfsData?.name}</Title>
        {isFetching && <Title order={3}>IPFS is slow :(</Title>}
        {isError && <Title order={3}>IPFS is so slow, it's timeout :(</Title>}
        {ipfsData?.image && (
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              ipfsData.image
            )}`}
          />
        )}
        <Text>ID: {tokenId.toString()}</Text>
      </Stack>
    </Card>
  );
};
