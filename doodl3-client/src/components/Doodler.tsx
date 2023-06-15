import { MutableRefObject, useRef, useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Stack,
  TextInput,
} from "@mantine/core";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { CornerUpLeft, CornerUpRight } from "tabler-icons-react";
import { useDoodl3NftSafeMint } from "../generated";
import chainConf from "../utils/chainConf";
import axios from "axios";
import { useAccount } from "wagmi";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

const Doodler = () => {
  const { address: userAddress } = useAccount();
  const [name, setName] = useState("");
  const [doodl3Loading, setDoodl3Loading] = useState(false);

  const { data, isLoading, isSuccess, writeAsync } = useDoodl3NftSafeMint({
    address: chainConf.contractAddress,
  });

  const canvas = useRef() as MutableRefObject<ReactSketchCanvasRef>;

  const uploadAndMint = () => {
    if (canvas.current) {
      canvas.current
        .exportSvg()
        .then(async (data) => {
          setDoodl3Loading(true);
          try {
            const json = JSON.stringify({
              pinataOptions: {
                cidVersion: 0,
              },
              pinataMetadata: {
                name: `Doodl3-${name}-JSON`,
              },
              pinataContent: {
                name: name,
                image: data,
              },
            });

            const config = {
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
              },
              data: json,
            };

            const resPinJSON = await axios(config);

            console.log(resPinJSON.data);

            await writeAsync({
              args: [`ipfs://${resPinJSON.data.IpfsHash}`],
            });
          } catch (error) {
            console.log(error);
          } finally {
            canvas.current.clearCanvas();
            setName("");
            setDoodl3Loading(false);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setDoodl3Loading(false));
    }
  };

  return (
    <Center>
      <Box
        sx={(theme) => ({
          textAlign: "center",
          padding: "24px",
          borderRadius: theme.radius.md,
          border: "gray 1px solid",
        })}
      >
        <Center>
          <Stack>
            <ReactSketchCanvas
              ref={canvas}
              style={styles}
              width="800px"
              height="800px"
              strokeWidth={8}
              strokeColor="black"
            />
            <Group>
              <ActionIcon>
                <CornerUpLeft />
              </ActionIcon>
              <ActionIcon>
                <CornerUpRight />
              </ActionIcon>
            </Group>
          </Stack>
        </Center>
        <Stack my="sm">
          <TextInput
            maxLength={20}
            size="lg"
            placeholder="Name your Doodl3"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <Button
            size="lg"
            disabled={!userAddress && doodl3Loading}
            loading={doodl3Loading ?? isLoading}
            onClick={uploadAndMint}
          >
            Create Doodl3
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Doodler;
