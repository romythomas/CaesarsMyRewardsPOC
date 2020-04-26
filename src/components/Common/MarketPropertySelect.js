import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option) => option.marketName + option.propertyName + option.parentLocation ,
});

const  MarketPropertySelect = (props)  => {
  let options=[];
  let defaultOptionIndex = -1;
  const {markets, defaultValue, width} = props;
  const onSelect = value => {
    if(props.onSelect) {
      props.onSelect(value);
    }
  };

  if(markets){
    markets.map((market) => {
      const marketName = market.Name;
      let parentLocation = "";
      parentLocation += market.ParentLocation ? market.ParentLocation.Code + " , " + market.ParentLocation.Name : "";
      parentLocation += market.ParentLocation && market.ParentLocation.ParentLocation ? " , " + market.ParentLocation.ParentLocation.Code + " , " + market.ParentLocation.ParentLocation.Name : "";
      market.Properties.map((property) => {
          options.push(
          {
              marketName: marketName,
              propertyCode: property.Code,
              propertyName: property.Name,
              parentLocation: parentLocation
          });
      })
    })
  }

  if(options.length && defaultValue) {
    defaultOptionIndex = options.findIndex((option) => {
      return option.propertyCode.toUpperCase() === defaultValue.toUpperCase();
    });
  }

  return (
    <Autocomplete
      id="market-property-select"
      defaultValue={options[defaultOptionIndex]}
      options={options}
      groupBy={(option) => option.marketName}
      getOptionLabel={(option) => option.propertyName}
      filterOptions={filterOptions}
      onChange={(event, value) => onSelect(value)}
      style={{ width: width ? width : "100%" }}
      renderInput={(params) => <TextField {...params} label="Market/Property" variant="outlined" />}
    />
  );
}

export default MarketPropertySelect;