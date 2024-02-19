import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { createReviewApiCall, getReviewApiCall } from "./logic";
import { Rating } from "react-native-elements"; // Import Rating from react-native-elements
import { apiFailureAction } from "../../commonApiLogic.Js";
import { useTranslation } from "react-i18next";

const ReviewComponent = ({
  reviewLoading: loading,
  reviews,
  fetchReviews,
  serviceProviderId,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = () => {
    if (reviewText === "" || rating <= 0) {
      alert("Please enter comment");
      return;
    }
    dispatch(
      createReviewApiCall({
        serviceProviderId,
        comment: reviewText,
        rating,
      })
    )
      .then((response) => {
        if (response.payload.data.success) {
          alert(response.payload.data.message);
          setReviewText("");
          setRating(0);
          fetchReviews();
        }
      })
      .catch((error) => {
        dispatch(apiFailureAction.apiFailure(error));
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t("Write-your-review")}
        value={reviewText}
        onChangeText={(text) => setReviewText(text)}
      />
      <Rating
        showRating
        // readonly
        startingValue={rating}
        onFinishRating={(value) => setRating(value)}
        style={{ paddingVertical: 10 }}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleReviewSubmit}
        disabled={reviewText === "" || rating < 0}
      >
        <Text style={styles.submitButtonText}>{t("Submit-Review")}</Text>
      </TouchableOpacity>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                {/* Add user image here */}
                <Image
                  source={{ uri: item.userProfileImageUrl }} // Replace 'userImage' with the actual field in your data
                  style={styles.userImage}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.userName}</Text>
                  {/* Additional user information can be added here */}
                </View>
              </View>
              <Text style={styles.reviewMessage}>{item.comment}</Text>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.loadMoreContainer}>
              {loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Button
                  title={t("Load-More")}
                  onPress={fetchReviews}
                  disabled={reviews?.length < 10}
                />
              )}
            </View>
          )}
        />
      ) : (
        <Text style={{ textAlign: "center" }}>{t("No-reviews-found")}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewItem: {
    marginBottom: 15,
  },
  loadMoreContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#3498db",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reviewItem: {
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewMessage: {
    fontSize: 14,
  },
});

export default ReviewComponent;
