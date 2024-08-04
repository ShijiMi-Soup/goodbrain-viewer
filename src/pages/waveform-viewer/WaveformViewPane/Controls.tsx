import {
  Button,
  IconButton,
  InputAdornment,
  Slider,
  Stack,
  SxProps,
  TextField,
} from "@mui/material";
import { roundTo, constants, GBFocusData, DataCategory } from "../../../global";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import "./number-input.css";
import {
  useDataCategoryContext,
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
  const [dataCategory] = useDataCategoryContext();

  const getMaxTime = (data: GBFocusData, category: DataCategory) => {
    return data[category].time[data[category].time.length - 1];
  };

  const getMaxTimeStart = (maxTime: number, _timeWidth: number) => {
    return Math.max(0, maxTime - _timeWidth);
  };

  const getTimeStartDelta = () => {
    return (
      constants.controls.DELTA_TIME_START_FACTOR / gbFocusData[dataCategory].fs
    );
  };

  const getTimeWidthDelta = () => {
    return (
      constants.controls.DELTA_TIME_WIDTH_FACTOR / gbFocusData[dataCategory].fs
    );
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
    setTimeWidth(Math.min(value, getMaxTime(gbFocusData, dataCategory)));
    const maxTimeStart = getMaxTimeStart(
      getMaxTime(gbFocusData, dataCategory),
      value
    );
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
    const maxTimeStart = getMaxTimeStart(
      getMaxTime(gbFocusData, dataCategory),
      timeWidth
    );
    setTimeStart(Math.min(value, maxTimeStart));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readGBFocusCsvData(file).then((data) => {
      setGBFocusData(data);
      setTimeWidth(getMaxTime(data, dataCategory));
    });
  };

  const handleSliderChange = (
    _e: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    const [newTimeStart, newTimeEnd] = newValue as number[];
    const newTimeWidth = newTimeEnd - newTimeStart;
    const maxTimeStart = getMaxTimeStart(
      getMaxTime(gbFocusData, dataCategory),
      newTimeWidth
    );
    const maxTime = getMaxTime(gbFocusData, dataCategory);

    // TODO: Create n_max and n_min
    const minDist = 10 / gbFocusData[dataCategory].fs;
    const maxDist = 10000 / gbFocusData[dataCategory].fs;

    if (activeThumb === 0) {
      setTimeStart(newTimeStart);
      if (newTimeStart >= maxTimeStart) {
        if (newTimeStart > timeStart) {
          const _newTimeWidth = maxTime - newTimeStart;
          if (_newTimeWidth < minDist) {
            setTimeWidth(minDist);
            setTimeStart(maxTime - minDist);
          } else {
            setTimeWidth(maxTime - newTimeStart);
          }
        }
      }
      return;
    }

    if (newTimeWidth < minDist) {
      setTimeStart(newTimeEnd - minDist);
      setTimeWidth(minDist);
      return;
    } else if (maxDist < newTimeWidth) {
      const clampedTimeStart = Math.max(newTimeStart, newTimeEnd - maxDist);
      setTimeStart(clampedTimeStart);
      setTimeWidth(maxDist);
      return;
    }

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
        max={getMaxTime(gbFocusData, dataCategory)}
        sx={{ mx: 4, flex: 1 }}
        disableSwap
        step={1}
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
