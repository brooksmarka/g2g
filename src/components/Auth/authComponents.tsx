import { Heading, useTheme } from '@aws-amplify/ui-react';

const authComponents = {
    SignIn: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
           Sign in to your g2g account
          </Heading>
        );
      },
    },
    SignUp: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Create a new g2g account
          </Heading>
        );
      },
    }
  }

  export default authComponents;