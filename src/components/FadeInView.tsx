import React, { useRef } from 'react';
import { Animated } from 'react-native';

type Props = {
    duration?: number,
    children: any
};

const FadeInView = ({
    duration = 1000,
    children
}: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {children}
    </Animated.View>
  );
}

export default FadeInView;