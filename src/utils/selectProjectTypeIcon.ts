import { ProjectTypeProps } from '../dto/projectsDTO';

import AISVG from '../assets/icons/projectType/ai.svg';
import WebSVG from '../assets/icons/projectType/browser.svg';
import DesktopSVG from '../assets/icons/projectType/desktop.svg';
import BackendSVG from '../assets/icons/projectType/database.svg';
import MobileSVG from '../assets/icons/projectType/device-mobile.svg';
import GameSVG from '../assets/icons/projectType/game-controller.svg';
import OtherSVG from '../assets/icons/projectType/codesandbox-logo.svg';

export function selectProjectTypeIcon(type: ProjectTypeProps) {
  switch (type) {
    case 'ai':
      return AISVG;
    case 'web':
      return WebSVG;
    case 'desktop':
      return DesktopSVG;
    case 'backend':
      return BackendSVG;
    case 'mobile':
      return MobileSVG;
    case 'game':
      return GameSVG;
    default:
      return OtherSVG;
  }
}
