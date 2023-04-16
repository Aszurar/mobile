import CSSSVG from '../assets/icons/technologies/css.svg';
import SQLSVG from '../assets/icons/technologies/sql.svg';
import NextSVG from '../assets/icons/technologies/next.svg';
import HTMLSVG from '../assets/icons/technologies/html.svg';
import JavaSVG from '../assets/icons/technologies/java.svg';
import DartSVG from '../assets/icons/technologies/dart.svg';
import NestSVG from '../assets/icons/technologies/nest.svg';
import ExpoSVG from '../assets/icons/technologies/expo.svg';
import MySQLSVG from '../assets/icons/technologies/mysql.svg';
import ReactSVG from '../assets/icons/technologies/react.svg';
import PythonSVG from '../assets/icons/technologies/python.svg';
import DjangoSVG from '../assets/icons/technologies/django.svg';
import SpringSVG from '../assets/icons/technologies/spring.svg';
import NodeJsSVG from '../assets/icons/technologies/nodejs.svg';
import FlutterSVG from '../assets/icons/technologies/flutter.svg';
import PostgreSQLSVG from '../assets/icons/technologies/postgresql.svg';
import TypeScriptSVG from '../assets/icons/technologies/typescript.svg';
import JavaScriptSVG from '../assets/icons/technologies/javascript.svg';
import ReactNativeSVG from '../assets/icons/technologies/react-native.svg';

import FileXSVG from '../assets/icons/file-x.svg';

function selectTechnologyIcon(technologies: string) {
  switch (technologies) {
    case 'React':
      return ReactSVG;
    case 'React Native':
      return ReactNativeSVG;
    case 'NodeJs':
      return NodeJsSVG;
    case 'JavaScript':
      return JavaScriptSVG;
    case 'Python':
      return PythonSVG;
    case 'HTML':
      return HTMLSVG;
    case 'CSS':
      return CSSSVG;
    case 'Java':
      return JavaSVG;
    case 'TypeScript':
      return TypeScriptSVG;
    case 'Flutter':
      return FlutterSVG;
    case 'Dart':
      return DartSVG;
    case 'PostgreSQL':
      return PostgreSQLSVG;
    case 'SQL':
      return SQLSVG;
    case 'Django':
      return DjangoSVG;
    case 'Spring':
      return SpringSVG;
    case 'Nest':
      return NestSVG;
    case 'Expo':
      return ExpoSVG;
    case 'MySQL':
      return MySQLSVG;
    case 'Next':
      return NextSVG;
    default:
      return FileXSVG;
  }
}

export { selectTechnologyIcon };
