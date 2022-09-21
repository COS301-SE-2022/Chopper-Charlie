import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
    FacebookButton,
    TwitterButton,
    LinkedinButton,
    CreateButton,
    MenuButton,
    ActionButton,
    AnalyseButton,
    DeleteButton,
    DownloadButton,
  } from './button.styles';
  
  export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
    facebook: 'facebook-sign-in',
    twitter: 'twitter-sign-in',
    linkedin: 'linkedin-sign-in',
    create: 'create-button',
    analyse : 'analyse-button',
    delete : 'delete-button',
    download : 'download-button',
  };
  
  const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
    ({
      [BUTTON_TYPE_CLASSES.base]: BaseButton,
      [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
      [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
      [BUTTON_TYPE_CLASSES.facebook]: FacebookButton,
      [BUTTON_TYPE_CLASSES.twitter]: TwitterButton,
      [BUTTON_TYPE_CLASSES.linkedin]: LinkedinButton,
      [BUTTON_TYPE_CLASSES.create]: CreateButton,
      [BUTTON_TYPE_CLASSES.menu]: MenuButton,
      [BUTTON_TYPE_CLASSES.menu]: AnalyseButton,
      [BUTTON_TYPE_CLASSES.menu]: DeleteButton,
      [BUTTON_TYPE_CLASSES.menu]: DownloadButton,
    }[buttonType]);
  
  const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton {...otherProps}>{children}</CustomButton>;
  };
  
  export default Button;