import colors from '@utils/colors';

const IS_PROD = window.location.hostname !== 'localhost';

const LOCAL_SOCKET_URL = 'http://localhost:3000';
const PROD_SOCKET_URL = '/';

export const SOCKET_URL = IS_PROD ? PROD_SOCKET_URL : LOCAL_SOCKET_URL;

/**
 * list of colors that may be assigned to collaborators
 */
export const COLLAB_COLORS = [
  colors.AMBER_600,
  colors.BLUE_600,
  colors.CYAN_600,
  colors.GREEN_600,
  colors.INDIGO_600,
  colors.ORANGE_600,
  colors.PINK_600,
  colors.PURPLE_600,
  colors.RED_600,
];
