import React from 'react';
import {Button} from "@/components/ui/button";

const SignIn = () => {
    const handleSignIn = () => {
        // Implement sign-in logic here
        console.log('Signing in...');
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form>
                {/* Example of using Button component */}
                <Button variant="destructive" size="default">
                    Sign In
                </Button>
            </form>
        </div>
    );
};

export default SignIn;
