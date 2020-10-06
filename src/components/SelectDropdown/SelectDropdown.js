import React from "react";
import Select from "react-select";

class SelectDropdown extends React.Component {
  render() {
    const {
      selectOptions,
      selectedOptions,
      isMulti,
      handleSelectChange
    } = this.props;
    return (
      <Select
        closeMenuOnSelect={false}
        defaultValue={selectedOptions}
        isMulti={isMulti}
        options={selectOptions}
        onChange={handleSelectChange}
      />
    );
  }
}
export default SelectDropdown;



