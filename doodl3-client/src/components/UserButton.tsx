import { Group, Avatar, Text, createStyles, Box, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.spacing.xs,
    margin: theme.spacing.xs,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },

  name: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

function UserButton() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { classes } = useStyles();

  return (
    <Box className={classes.user}>
      <Group>
        <Avatar radius="xl" />

        <Box sx={{ maxWidth: "150px" }} className={classes.name}>
          {isConnected ? (
            <Text truncate size="sm" weight={500}>
              {ensName ?? address}
            </Text>
          ) : (
            <Button onClick={() => connect()}>Connect Wallet</Button>
          )}
        </Box>
      </Group>
    </Box>
  );
}

export default UserButton;
