import { Circle } from "@mui/icons-material";
import { Stack, SxProps, Tab, Tabs, Typography, Checkbox } from "@mui/material";
import { useState } from "react";

export type DataSelectionPaneProps = {
  sx?: SxProps;
};
export const DataSelectionPane = ({ sx }: DataSelectionPaneProps) => {
  const [tabValue, setTabValue] = useState("index");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Stack sx={{ ...sx }}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="状態指数" value="index" />
        <Tab label="脳波" value="raw" />
      </Tabs>
      {tabValue === "index" && <IndexSelectionInput />}
      {tabValue === "raw" && <RawSelectionInput />}
    </Stack>
  );
};

const IndexSelectionInput = () => {
  return (
    <Stack direction="column">
      <DataSelectionInput color="red" label="集中度" />
      <DataSelectionInput color="orange" label="リラックス度" />
    </Stack>
  );
};

const RawSelectionInput = () => {
  return (
    <Stack direction="column">
      <DataSelectionInput color="yellow" label="δ波" />
      <DataSelectionInput color="green" label="θ波" />
      <DataSelectionInput color="teal" label="α波" />
      <DataSelectionInput color="blue" label="β波" />
      <DataSelectionInput color="purple" label="γ波" />
      <DataSelectionInput color="gray" label="生波形" />
    </Stack>
  );
};

type DataSelectionInputProps = {
  label: string;
  color: string;
};
const DataSelectionInput = ({ label, color }: DataSelectionInputProps) => {
  return (
    <Stack direction="row" alignItems="center" p={1}>
      <Checkbox />
      <Circle fontSize="small" sx={{ mr: 1, color: color }} />
      <Typography>{label}</Typography>
    </Stack>
  );
};
