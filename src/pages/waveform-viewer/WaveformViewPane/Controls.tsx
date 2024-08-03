import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  SxProps,
  TextField,
} from "@mui/material";
import {
  DELTA_TIME_POS,
  DELTA_TIME_WIDTH,
  roundTo,
  WF_VIEWER_CONTROLS_TEXT,
} from "../../../global";
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
import { useEffect } from "react";

const texts = WF_VIEWER_CONTROLS_TEXT;
const ROUND_DIGITS = 5;
const NUM_INPUT_WIDTH = "4rem";

export type ControlsProps = {
  sx?: SxProps;
};
export const Controls = ({ sx }: ControlsProps) => {
  const [timeWidth, setTimeWidth] = useTimeWidthContext();
  const [timePos, setTimePos] = useTimeStartContext();
  const [gbFocusData, setGBFocusData] = useGBFocusDataContext();

  const getMaxTimePos = (maxTime: number, _timeWidth: number) =>
    maxTime - _timeWidth;

  useEffect(() => {
    const maxTimePos = getMaxTimePos(gbFocusData.maxTime, timeWidth);
    if (maxTimePos < timePos) {
      setTimePos(maxTimePos);
    }
  }, [gbFocusData, timeWidth, timePos, setTimePos]);

  const onTimeWidthIncrease = () => {
    const newTimeWidth = roundTo(timeWidth + DELTA_TIME_WIDTH, ROUND_DIGITS);
    onTimeWidthChange(newTimeWidth);
  };
  const onTimeWidthDecrease = () => {
    const newTimeWidth = roundTo(timeWidth - DELTA_TIME_WIDTH, ROUND_DIGITS);
    onTimeWidthChange(newTimeWidth);
  };
  const onTimeWidthChange = (value: number) => {
    setTimeWidth(Math.min(value, gbFocusData.maxTime));
  };

  const onTimePosIncrease = () => {
    const newTimePos = roundTo(timePos + DELTA_TIME_POS, ROUND_DIGITS);
    onTimePosChange(newTimePos);
  };
  const onTimePosDecrease = () => {
    const newTimePos = roundTo(timePos - DELTA_TIME_POS, ROUND_DIGITS);
    onTimePosChange(newTimePos);
  };
  const onTimePosChange = (value: number) => {
    const maxTimePos = getMaxTimePos(gbFocusData.maxTime, timeWidth);
    setTimePos(Math.min(Math.max(value, 0), maxTimePos));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readGBFocusCsvData(file).then((data) => {
      setGBFocusData(data);
    });
  };

  return (
    <Stack
      p={1}
      sx={{ ...sx }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <input
        accept=".csv"
        id="csv-file-input"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="csv-file-input">
        <Button variant="outlined" component="span">
          {texts.SELECT_CSV}
        </Button>
      </label>
      <Stack direction="row" alignItems="center">
        <NumberInput
          value={timeWidth}
          decreaseIcon={<ZoomIn />}
          increaseIcon={<ZoomOut />}
          endAdornment={texts.TIME_LABEL}
          onIncrease={onTimeWidthIncrease}
          onDecrease={onTimeWidthDecrease}
          onInputChange={onTimeWidthChange}
        />
        <NumberInput
          value={timePos}
          decreaseIcon={<KeyboardArrowLeft />}
          increaseIcon={<KeyboardArrowRight />}
          endAdornment={texts.TIME_LABEL}
          onIncrease={onTimePosIncrease}
          onDecrease={onTimePosDecrease}
          onInputChange={onTimePosChange}
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
