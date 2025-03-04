import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search models..."
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        marginBottom: 2,
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'white',
          '&:hover': {
            '& > fieldset': {
              borderColor: '#90caf9',
            },
          },
        },
      }}
    />
  );
};

export default SearchBar; 