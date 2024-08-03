import {
  Button,
  IconButton,
  InputAdornment,
  Slider,
  Stack,
  SxProps,
  TextField,
} from "@mui/material";
import { roundTo, constants } from "../../../global";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import "./number-input.css";
import {
  useGBFocusDataContext,
  useTimeStartContext,
  useTimeWidthContext,
} from "../../../global/contexts";
import { readGBFocusCsvData } from "../../../lib";

const ROUND_DIGITS = 5;
const NUM_INPUT_WIDTH = "4rem";

export type ControlsProps = {
  sx?: SxProps;
};
export const Controls = ({ sx }: ControlsProps) => {
  const [timeWidth, setTimeWidth] = useTimeWidthContext();
  const [timeStart, setTimeStart] = useTimeStartContext();
  const [gbFocusData, setGBFocusData] = useGBFocusDataContext();

  const getMaxTimeStart = (maxTime: number, _timeWidth: number) => {
    return Math.max(0, maxTime - _timeWidth);
  };

  const getTimeStartDelta = () => {
    return timeWidth / constants.controls.DELTA_TIME_START_FACTOR;
  };

  const getTimeWidthDelta = () => {
    return gbFocusData.maxTime / constants.controls.DELTA_TIME_WIDTH_FACTOR;
  };

  const onTimeWidthIncrease = () => {
    const newTimeWidth = roundTo(timeWidth + getTimeWidthDelta(), ROUND_DIGITS);
    onTimeWidthChange(newTimeWidth);
  };
  const onTimeWidthDecrease = () => {
    const newTimeWidth = roundTo(timeWidth - getTimeWidthDelta(), ROUND_DIGITS);
    onTimeWidthChange(newTimeWidth);
  };
  const onTimeWidthChange = (value: number) => {
    setTimeWidth(Math.min(value, gbFocusData.maxTime));
    const maxTimeStart = getMaxTimeStart(gbFocusData.maxTime, value);
    if (timeStart > maxTimeStart) {
      setTimeStart(maxTimeStart);
    }
  };

  const onTimeStartIncrease = () => {
    const newTimeStart = roundTo(timeStart + getTimeStartDelta(), ROUND_DIGITS);
    onTimeStartChange(newTimeStart);
  };
  const onTimeStartDecrease = () => {
    const newTimeStart = roundTo(timeStart - getTimeStartDelta(), ROUND_DIGITS);
    onTimeStartChange(newTimeStart);
  };
  const onTimeStartChange = (value: number) => {
    const maxTimeStart = getMaxTimeStart(gbFocusData.maxTime, timeWidth);
    setTimeStart(Math.min(value, maxTimeStart));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readGBFocusCsvData(file).then((data) => {
      setGBFocusData(data);
      setTimeWidth(data.maxTime);
    });
  };

  const handleSliderChange = (_e: Event, newValue: number | number[]) => {
    const [newTimeStart, newTimeEnd] = newValue as number[];
    const newTimeWidth = newTimeEnd - newTimeStart;
    const maxTimeStart = getMaxTimeStart(gbFocusData.maxTime, newTimeWidth);

    setTimeWidth(newTimeWidth);
    setTimeStart(Math.min(newTimeStart, maxTimeStart));
  };

  return (
    <Stack
      p={1}
      sx={{ ...sx }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Button variant="outlined" component="label">
        {constants.texts.SELECT_CSV}
        <input accept=".csv" hidden type="file" onChange={handleFileChange} />
      </Button>
      <Slider
        value={[timeStart, timeStart + timeWidth]}
        onChange={handleSliderChange}
        min={0}
        max={gbFocusData.maxTime}
        sx={{ mx: 4, flex: 1 }}
      />
      <Stack direction="row" alignItems="center">
        <NumberInput
          value={timeWidth}
          decreaseIcon={<ZoomIn />}
          increaseIcon={<ZoomOut />}
          endAdornment={constants.texts.TIME_LABEL}
          onIncrease={onTimeWidthIncrease}
          onDecrease={onTimeWidthDecrease}
          onInputChange={onTimeWidthChange}
        />
        <NumberInput
          value={timeStart}
          decreaseIcon={<KeyboardArrowLeft />}
          increaseIcon={<KeyboardArrowRight />}
          endAdornment={constants.texts.TIME_LABEL}
          onIncrease={onTimeStartIncrease}
          onDecrease={onTimeStartDecrease}
          onInputChange={onTimeStartChange}
        />
      </Stack>
    </Stack>
  );
};

type NumberInputProps = {
  value: number;
  decreaseIcon: React.ReactNode;
  increaseIcon: React.ReactNode;
  endAdornment?: React.ReactNode;
  onDecrease?: () => void;
  onIncrease?: () => void;
  onInputChange?: (value: number) => void;
};
const NumberInput = ({
  value,
  decreaseIcon,
  increaseIcon,
  endAdornment,
  onIncrease,
  onDecrease,
  onInputChange,
}: NumberInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (onInputChange) onInputChange(newValue);
  };
  return (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={onDecrease}>{decreaseIcon}</IconButton>
      <TextField
        value={value}
        variant="standard"
        type="number"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
        }}
        inputProps={{ sx: { textAlign: "end" } }}
        sx={{ width: NUM_INPUT_WIDTH }}
        onChange={handleInputChange}
      />
      <IconButton onClick={onIncrease}>{increaseIcon}</IconButton>
    </Stack>
  );
};
