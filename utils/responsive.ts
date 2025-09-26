import { Dimensions, useWindowDimensions } from 'react-native';

/**
 * Determines the number of columns for a grid based on screen width.
 * @returns {number} The number of columns.
 */
export const getGridColumns = (): number => {
  const { width: screenWidth } = Dimensions.get('window');
  if (screenWidth > 1024) {
    return 4; // Large screens, like tablets in landscape
  }
  if (screenWidth > 768) {
    return 3; // Medium screens, like tablets in portrait
  }
  if (screenWidth > 480) {
    return 2; // Small screens, like larger phones
  }
  return 1; // Extra-small screens
};

/**
 * A hook to get responsive values based on screen width.
 * @param values - An object with breakpoints as keys and values to return.
 * @returns The value for the current breakpoint.
 */
export const useResponsive = <T>(values: { [key: string]: T }): T => {
  const { width } = useWindowDimensions();
  if (width > 1024) {
    return values.lg || values.md || values.sm || values.xs;
  }
  if (width > 768) {
    return values.md || values.sm || values.xs;
  }
  if (width > 480) {
    return values.sm || values.xs;
  }
  return values.xs;
};

/**
 * Calculates responsive image dimensions.
 * @param baseSize - The base size of the image.
 * @returns An object with width and height.
 */
export const getImageSize = (baseSize: number) => {
  const { width: screenWidth } = Dimensions.get('window');
  const columns = getGridColumns();
  const padding = 20; // Assuming some padding in the container
  const availableWidth = screenWidth - padding * (columns + 1);
  const width = availableWidth / columns;
  
  // You can adjust the aspect ratio as needed
  const height = width * 1.25; 

  return { width, height };
};