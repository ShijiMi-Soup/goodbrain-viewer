import { Circle } from "@mui/icons-material";
import { Stack, SxProps, Tab, Tabs, Typography, Checkbox } from "@mui/material";
import { BrainWaveData, constants, DataCategory } from "../../global";
import { DATA_CATEGORIES } from "../../global/constants/data";
import {
  useDataCategoryContext,
  useDataSelectionContext,
} from "../../global/contexts";

export type DataSelectionPaneProps = {
  sx?: SxProps;
};
export const DataSelectionPane = ({ sx }: DataSelectionPaneProps) => {
  const [tabValue, setTabValue] = useDataCategoryContext();

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    if (DATA_CATEGORIES.includes(newValue as DataCategory))
      setTabValue(newValue as DataCategory);
  };

  return (
    <Stack sx={{ ...sx }}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        {DATA_CATEGORIES.map((category) => (
          <Tab
            key={category}
            label={constants.data.DATA_CATEGORY_LABELS[category]}
            value={category}
          />
        ))}
      </Tabs>
      {tabValue && <SelectionInputs dataCategory={tabValue} />}
    </Stack>
  );
};

type SelectionInputsProps = {
  dataCategory: DataCategory;
};
const SelectionInputs = ({ dataCategory }: SelectionInputsProps) => {
  const dataCategoryItems = constants.data.DATA_CATEGORY_ITEMS;
  const dataLabels = constants.data.DATA_LABELS;
  const [dataSelection] = useDataSelectionContext();

  return (
    <Stack direction="column">
      {dataCategoryItems[dataCategory].map((_key) => {
        const key = _key as keyof BrainWaveData;
        return (
          <DataSelectionInput
            key={key}
            label={dataLabels[key].text}
            color={dataLabels[key].color}
            checked={dataSelection[key]}
          />
        );
      })}
    </Stack>
  );
};

type DataSelectionInputProps = {
  label: string;
  color: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
};
const DataSelectionInput = ({
  label,
  color,
  checked,
  onChange,
}: DataSelectionInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.checked);
  };

  return (
    <Stack direction="row" alignItems="center" p={1}>
      <Checkbox checked={checked} onChange={handleChange} color="primary" />
      <Circle fontSize="small" sx={{ mr: 1, color: color }} />
      <Typography>{label}</Typography>
    </Stack>
  );
};
