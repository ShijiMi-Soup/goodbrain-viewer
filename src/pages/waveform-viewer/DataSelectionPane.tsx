import { Circle } from "@mui/icons-material";
import { Stack, SxProps, Tab, Tabs, Typography, Checkbox } from "@mui/material";
import { constants, DataCategory } from "../../global";
import { DATA_CATEGORIES } from "../../global/constants/data";
import {
  useDataCategoryContext,
  useDataConfigsContext,
} from "../../global/contexts";

export type DataSelectionPaneProps = {
  sx?: SxProps;
};
export const DataSelectionPane = ({ sx }: DataSelectionPaneProps) => {
  const [dataCategory, setDataCategory] = useDataCategoryContext();

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    if (DATA_CATEGORIES.includes(newValue as DataCategory))
      setDataCategory(newValue as DataCategory);
  };

  return (
    <Stack sx={{ ...sx }}>
      <Tabs value={dataCategory} onChange={handleTabChange}>
        {DATA_CATEGORIES.map((category) => (
          <Tab
            key={category}
            label={constants.data.DATA_CATEGORY_LABELS[category]}
            value={category}
          />
        ))}
      </Tabs>
      <SelectionInputs dataCategory={dataCategory} />
    </Stack>
  );
};

type SelectionInputsProps = {
  dataCategory: DataCategory;
};
const SelectionInputs = ({ dataCategory }: SelectionInputsProps) => {
  const [dataConfigs, setDataConfigs] = useDataConfigsContext();

  return (
    <Stack direction="column">
      {Object.entries(dataConfigs[dataCategory]).map(([key, dataConfig]) => {
        return (
          <DataSelectionInput
            key={key}
            label={dataConfig.label}
            color={dataConfig.color}
            checked={dataConfig.show}
            onChange={(checked) => {
              setDataConfigs({
                ...dataConfigs,
                [dataCategory]: {
                  ...dataConfigs[dataCategory],
                  [key]: { ...dataConfig, show: checked },
                },
              });
            }}
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
