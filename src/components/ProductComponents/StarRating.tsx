import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StarRatingProps {
  rating: number; // Rating value to display
}

const StarRating: React.FC<StarRatingProps> = ({rating}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<Icon key={i} name="star" size={24} color="#FFD700" />); // Full star
      } else if (rating + 0.5 === i) {
        stars.push(<Icon key={i} name="star-half" size={24} color="#FFD700" />); // Half star
      } else {
        stars.push(
          <Icon key={i} name="star-border" size={24} color="#FFD700" />,
        ); // Empty star
      }
    }
    return stars;
  };

  return <View className="flex-row">{renderStars()}</View>;
};

export default StarRating;
