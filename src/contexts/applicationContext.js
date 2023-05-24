import { createContext } from 'react';

const ApplicationContext = createContext({
  id: '',
  setStatus: () => {},
  reload: () => {}
});

export default ApplicationContext;
