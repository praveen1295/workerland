import loginReducer from "../screens/Login/logic";
import localServiceProviders from "../screens/tabs/logic";
import adminChangeAccountStatusReducer from "../screens/AdminOrder/logic";
import userChangeAccountStatusReducer from "../screens/MyOrders/logic";
import serviceProviderReducer from "../screens/Calender/logic";
import notificationsReducer from "../screens/Notifications/logic";
import getUserReducer from "../utils/getUser";
import reviewReducer from "../screens/ServiceProviderDetail/logic";
import apiFailureReducer from "../commonApiLogic.Js";
import getServiceProviderReducer from "../utils/getServiceProviderById";
import updateAvailabilityReducer from "../screens/MyAvailability/logic";
import getServiceProviderInfo from "../utils/getServiceProviderInfo";
import getBookingReducer from "../screens/BookingDetail/logic";
import forgetPasswordReducer from "../screens/ForgotPassword/logic";
import otpReducer from "../screens/OTP/logic";
import logoutReducer from "../screens/Setting/logic";
export const combinedReducers = {
  ...loginReducer,
  ...localServiceProviders,
  ...adminChangeAccountStatusReducer,
  ...userChangeAccountStatusReducer,
  ...serviceProviderReducer,
  ...notificationsReducer,
  ...getUserReducer,
  ...reviewReducer,
  ...apiFailureReducer,
  ...getServiceProviderReducer,
  ...updateAvailabilityReducer,
  ...getServiceProviderInfo,
  ...getBookingReducer,
  ...forgetPasswordReducer,
  ...otpReducer,
  ...logoutReducer,
};
