import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  SxProps,
  TextField,
} from "@mui/material";
import { roundTo, WF_VIEWER_CONTROLS_TEXT } from "../../../global";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ZoomIn,
  ZoomOut,
} from "@mui/icons-material";
import "./number-input.css";
import { useState } from "react";

const texts = WF_VIEWER_CONTROLS_TEXT;
const DELTA_TIME_WIDTH = 0.2;
const INIT_TIME_WIDTH = 10;
const DELTA_TIME_POS = 0.2;
const INIT_TIME_POS = 0;
const ROUND_DIGITS = 5;
const NUM_INPUT_WIDTH = "4rem";

export type ControlsProps = {
  sx?: SxProps;
};
export const Controls = ({ sx }: ControlsProps) => {
  const [timeWidth, setTimeWidth] = useState(INIT_TIME_WIDTH); // TODO: Temp
  const [timePos, setTimePos] = useState(INIT_TIME_POS); // TODO: Temp

  const onTimeWidthIncrease = () => {
    const newTimeWidth = roundTo(timeWidth + DELTA_TIME_WIDTH, ROUND_DIGITS);
    setTimeWidth(newTimeWidth);
  };
  const onTimeWidthDecrease = () => {
    const newTimeWidth = roundTo(timeWidth - DELTA_TIME_WIDTH, ROUND_DIGITS);
    setTimeWidth(newTimeWidth);
  };
  const onTimeWidthChange = (value: number) => {
    setTimeWidth(value);
  };

  const onTimePosIncrease = () => {
    const newTimePos = roundTo(timePos + DELTA_TIME_POS, ROUND_DIGITS);
    setTimePos(newTimePos);
  };
  const onTimePosDecrease = () => {
    const newTimePos = roundTo(timePos - DELTA_TIME_POS, ROUND_DIGITS);
    setTimePos(newTimePos);
  };
  const onTimePosChange = (value: number) => {
    setTimePos(value);
  };

  return (
    <Stack
      p={1}
      sx={{ ...sx }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Button variant="outlined">{texts.SELECT_CSV}</Button>
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
