import Toast from "react-native-toast-message";

export const showToast = (
  type,
  title,
  description,
  onPress,
  onHide,
  onShow
) => {
  Toast.show({
    type: type,
    text1: title ? title : "",
    text2: description ? description : "",
    // autoHide: true,
    // visibilityTime: 2500,
    // onPress={onPress ? onPress : () => ""}
    // onShow={onPress ? onShow : () => ""}
    // onHide={onHide ? onPress : () => ""}
  });
};
