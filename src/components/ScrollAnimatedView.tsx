
import React from 'react';
import { Animated, Dimensions } from 'react-native';

type Props = {
  index: number,
  y: Animated.Value,
  style: any,
  children: any,
};

const { width } = Dimensions.get("window");
const ratio = 228 / 362;
const CARD_WIDTH = width * 0.8;
const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio;

const MARGIN = 16;
const CARD_HEIGHT = DEFAULT_CARD_HEIGHT;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 40;

const ScrollAnimatedView = ({ style, children, index, y }: Props) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = - CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;

  const translateY = Animated.add(Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.00001 + index * CARD_HEIGHT],
      outputRange: [0, -index * CARD_HEIGHT],
      extrapolateRight: 'clamp',
    }),
  ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: 'clamp'
    })
  );

  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });

  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }, { scale }] }]}>
        {children}
    </Animated.View>
  );
};

export default ScrollAnimatedView;
