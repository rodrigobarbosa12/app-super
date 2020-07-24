import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

const AnimatedView = ({
  duration,
  children,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration,
      },
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};

AnimatedView.defaultProps = {
  duration: 10000,
};

export default AnimatedView;
