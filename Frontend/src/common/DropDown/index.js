import { Dimensions, View } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";

const Index = ({
  items,
  currentValue,
  setCurrentValue,
  placeholder,
  setShowSubcategories,
  backgroundColor,
  width,
  padding,
  marginBottom,
  marginRight,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <View>
      <DropDownPicker
        style={{
          backgroundColor: backgroundColor || "#415D79",
          padding: padding || 10,
          borderRadius: 5,
          marginBottom: marginBottom || 20,
          width: width || 200,
          marginLeft: 10,
          marginRight: marginRight,
        }}
        items={items}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        value={currentValue}
        setValue={(val) => {
          setCurrentValue(val);
          setShowSubcategories && setShowSubcategories(true);
        }}
        maxHeight={200}
        autoScroll
        placeholder={t(placeholder)}
        placeholderStyle={{ color: "white", opacity: 0.6 }}
        showTickIcon={true}
        showArrowIcon={true}
        dropDownDirection="TOP"
        multiple={false}
        // theme="DARK"
      />
    </View>
  );
};

export default Index;
