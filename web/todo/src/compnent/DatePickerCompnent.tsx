import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';

export default function DatePickerCompnent({ onDateChange,label }) {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date ?  date.format('DD MM YYYY') : null); // Format the date as needed
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params}           required
        />
      }sx={{backgroundColor:"white"}}
      />
    </LocalizationProvider>
  );
}
