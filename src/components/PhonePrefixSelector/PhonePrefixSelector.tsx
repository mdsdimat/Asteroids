// Core
import React from 'react';

// Components
import { Select } from 'antd';

const { Option } = Select;
const PhonePrefixSelector: React.FC = () => (
  <Select style={{ width: 100 }}>
    <Option value="375">+375</Option>
    <Option value="7">+7</Option>
  </Select>
);

// Exports
export default PhonePrefixSelector;
